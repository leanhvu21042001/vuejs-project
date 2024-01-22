import * as yup from 'yup'
import { isFileSizeValid, isFileTypesValid } from '~/validates'
import { FILE_SIZE, IMAGE_SIZE, SUPPORTED_FORMATS, SUPPORTED_FORMATS_TEXT } from '~/constants'

export const schemaCreateProductValidate = yup.object({
  // id: yup.string(),
  name: yup
    .string()
    .required('Vui lòng nhập tên sản phẩm')
    .min(5, 'Tên sản phẩm phải lớn hơn 5 ký tự'),
  price: yup
    .number()
    .typeError('Giá bán chỉ được nhập số')
    .required('Giá bán không được để trống')
    .min(0, 'Giá bán không được nhỏ hơn 0'),
  // description: yup.string().nullable().notRequired(),
  isSales: yup.number().required('Trạng thái không được để trống'),
  fileUpload: yup
    .mixed()
    .test('fileSize', 'Dung lượng hình không quá 2Mb', (file) => {
      if (!file) return true
      return isFileSizeValid([file], FILE_SIZE)
    })
    .test('fileType', `không đúng định dạng ảnh, yêu cầu [${SUPPORTED_FORMATS_TEXT}]`, (file) => {
      if (!file) return true
      return isFileTypesValid([file], SUPPORTED_FORMATS)
    })
    .test('fileOriginSize', `Kích thước ảnh không vượt quá ${IMAGE_SIZE}px`, async (file) => {
      if (!file) return true
      const isLargeImage = await loadImage(file)
      return isLargeImage
    })
})

async function loadImage(file) {
  return new Promise((resolve, reject) => {
    const image = new Image()

    image.onload = function () {
      if (image.naturalWidth > 1024 || image.naturalHeight > 1024) {
        resolve(false)
      } else {
        resolve(true)
      }
    }

    image.onerror = function () {
      reject(true)
    }

    image.src = URL.createObjectURL(file)
  })
}
