import { useQuery } from '@tanstack/vue-query'
import productService from '~/services/product-service'

const useGetSingleProductHook = (id) => {
  const { data: product } = useQuery({
    queryKey: ['getSingleProduct', id],
    queryFn: () => productService.getSingleProduct(id),
    retry: 0,
    refetchOnWindowFocus: false,
    initialData: {},
    select: (data) => data?.product ?? {}
  })

  return {
    product
  }
}

export default useGetSingleProductHook
