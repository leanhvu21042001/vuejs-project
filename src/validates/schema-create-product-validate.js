import * as yup from 'yup'
import { isFileSizeValid, isFileTypesValid } from '~/validates'
import { FILE_SIZE, SUPPORTED_FORMATS, SUPPORTED_FORMATS_TEXT } from '~/constants'

export const schemaCreateProductValidate = yup.object({
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
    .test('fileSize', 'Dung lượng hình không quá 2Mb', (value) => {
      if (!value) return true
      return isFileSizeValid([value], FILE_SIZE)
    })
    .test('fileType', `không đúng định dạng ảnh, yêu cầu [${SUPPORTED_FORMATS_TEXT}]`, (value) => {
      if (!value) return true
      return isFileTypesValid([value], SUPPORTED_FORMATS)
    })
})
