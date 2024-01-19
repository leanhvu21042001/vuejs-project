import { computed } from 'vue'

import { useForm } from 'vee-validate'
import { useMutation } from '@tanstack/vue-query'

import router from '~/router'
import productService from '~/services/product-service'
import { scrollIntoErrorView } from '~/helpers'
import { schemaCreateProductValidate } from '~/validates'

const useCreateProductHook = () => {
  const { mutate: mutateCreateProduct } = useMutation({
    mutationFn: productService.createProduct
  })

  const { errors, handleSubmit, defineField, setFieldError, setFieldValue } = useForm({
    validationSchema: schemaCreateProductValidate
  })

  const [name, nameAttrs] = defineField('name')
  const [price, priceAttrs] = defineField('price')
  const [description, descriptionAttrs] = defineField('description')
  const [isSales, isSalesAttrs] = defineField('isSales')
  const [fileUpload, fileUploadAttrs] = defineField('fileUpload')

  const imageShow = computed(() => {
    if (!fileUpload.value) return
    const image = URL.createObjectURL(fileUpload.value)
    return image
  })

  const imageName = computed(() => {
    return fileUpload.value?.name
  })

  const deleteImage = () => {
    setFieldValue('fileUpload', undefined)
  }

  const onCreateProduct = handleSubmit(
    (values) => {
      mutateCreateProduct(values, {
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
      })
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
    errors,
    imageShow,
    imageName,
    onCreateProduct,
    deleteImage
  }
}

export default useCreateProductHook
