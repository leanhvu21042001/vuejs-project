import { ref } from 'vue'
import { useForm } from 'vee-validate'
import { useMutation, useQueryClient } from '@tanstack/vue-query'

import productService from '~/services/product-service'

const useDeleteProductHook = () => {
  const queryClient = useQueryClient()
  const isShowModal = ref(false)

  const { mutate: mutateDeleteProduct } = useMutation({
    mutationKey: 'deleteProduct',
    mutationFn: productService.deleteProduct
  })

  const { handleSubmit, defineField, setFieldValue } = useForm({})
  const [id, idAttrs] = defineField('id')

  const onDeleteProduct = handleSubmit(({ id }) => {
    mutateDeleteProduct(id, {
      onSuccess: (data) => {
        if (data.status) {
          queryClient.invalidateQueries({ queryKey: ['getProducts'] })
          hideModalDelete()
        }
      }
    })
  })

  const setIdDelete = (id) => {
    setFieldValue('id', id)
  }

  const showModalDelete = (productId) => {
    setFieldValue('id', productId)
    isShowModal.value = true
  }

  const hideModalDelete = () => {
    isShowModal.value = false
  }
  return {
    id,
    idAttrs,
    isShowModal,
    showModalDelete,
    hideModalDelete,
    setIdDelete,
    onDeleteProduct
  }
}

export default useDeleteProductHook
