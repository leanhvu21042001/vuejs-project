import { computed, ref } from 'vue'

import { useForm } from 'vee-validate'
import { useMutation } from '@tanstack/vue-query'

import router from '~/router'
import productService from '~/services/product-service'
import { scrollIntoErrorView } from '~/helpers'
import { schemaCreateProductValidate } from '~/validates'

const useUpdateProductHook = (id) => {
  const imageUrl = ref(undefined)

  const { mutate: mutateUpdateProduct } = useMutation({
    mutationKey: 'updateProduct',
    mutationFn: productService.updateProduct
  })

  const { errors, handleSubmit, defineField, setFieldError, setFieldValue, setValues } = useForm({
    validationSchema: schemaCreateProductValidate // update name if need
  })

  const [name, nameAttrs] = defineField('name')
  const [price, priceAttrs] = defineField('price')
  const [description, descriptionAttrs] = defineField('description')
  const [isSales, isSalesAttrs] = defineField('isSales')
  const [fileUpload, fileUploadAttrs] = defineField('fileUpload')
  const [imageName, imageNameAttrs] = defineField('imageName')

  const imageShow = computed(() => {
    if (!fileUpload.value && imageUrl.value) return imageUrl.value
    else if (!fileUpload.value) return

    setFieldValue('imageName', fileUpload.value.name)

    const image = URL.createObjectURL(fileUpload.value)

    return image
  })

  const deleteImage = () => {
    setFieldValue('fileUpload', undefined)
    setFieldValue('imageName', undefined)
    imageUrl.value = undefined
  }

  const setImageUrl = (url) => (imageUrl.value = url)

  const onUpdateProduct = handleSubmit(
    (values) => {
      mutateUpdateProduct(
        { ...values, id },
        {
          onSuccess: (data) => {
            if (data?.status) {
              router.push({ name: 'ListProduct' })
            }
          },
          onError: (error) => {
            Object.entries(error.details).forEach(([key, errorList]) => {
              setFieldError(key, errorList[0])
            })
          }
        }
      )
    },
    ({ errors }) => {
      const firstError = Object.keys(errors)[0]
      scrollIntoErrorView(firstError)
    }
  )

  return {
    name,
    nameAttrs,
    price,
    priceAttrs,
    description,
    descriptionAttrs,
    isSales,
    isSalesAttrs,
    fileUpload,
    fileUploadAttrs,
    imageName,
    imageNameAttrs,
    errors,
    imageShow,
    onUpdateProduct,
    deleteImage,
    setValues,
    setImageUrl
  }
}

export default useUpdateProductHook
