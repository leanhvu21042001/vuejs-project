import { ref } from 'vue'
import * as yup from 'yup'
import { useForm } from 'vee-validate'
import { useQuery } from '@tanstack/vue-query'

import productService from '~/services/product-service'

const useGetProductsHook = () => {
  const dataSearch = ref({
    page: 1,
    perPage: 10,
    name: '',
    status: '',
    priceFrom: 0,
    priceTo: 0
  })

  const { handleSubmit, errors, defineField, setValues } = useForm({
    validationSchema: yup.object({
      priceFrom: yup
        .number()
        .transform((value) => (Number.isNaN(value) ? null : value))
        .nullable(true)
        .test('lessThanPriceTo', 'Giá bắt đầu phải nhỏ hơn giá kết thúc', function (value) {
          const priceTo = this.parent.priceTo
          return !value || !priceTo || value < priceTo
        }),
      priceTo: yup
        .number()
        .transform((value) => (Number.isNaN(value) ? null : value))
        .nullable(true)
        .test('greaterThanPriceFrom', 'Giá kết thúc phải lớn hơn giá bắt đầu', function (value) {
          const priceFrom = this.parent.priceFrom
          return !value || !priceFrom || value > priceFrom
        })
    })
  })

  const [name, nameAttrs] = defineField('name')
  const [status, statusAttrs] = defineField('status')
  const [priceFrom, priceFromAttrs] = defineField('priceFrom')
  const [priceTo, priceToAttrs] = defineField('priceTo')

  const { data, refetch } = useQuery({
    queryKey: ['getProducts', dataSearch.value],
    queryFn: () => productService.getProducts(dataSearch.value),
    retry: 0,
    refetchOnWindowFocus: false,
    initialData: {}
  })

  const onSearch = handleSubmit((values) => {
    dataSearch.value = {
      ...dataSearch.value,
      ...values
    }

    if (Object.keys(values).length > 0) {
      refetch()
    }
  })

  const onResetSearch = () => {
    dataSearch.value = {
      page: 1,
      perPage: 10,
      name: '',
      status: '',
      priceFrom: 0,
      priceTo: 0
    }

    setValues({
      name: '',
      status: '',
      priceFrom: 0,
      priceTo: 0
    })
    refetch()
  }

  const onChangePage = (page) => {
    dataSearch.value = {
      ...dataSearch.value,
      page
    }

    refetch()
  }

  const onChangePerPage = (event) => {
    dataSearch.value = {
      ...dataSearch.value,
      page: 1,
      perPage: Number(event.target.value)
    }

    refetch()
  }

  return {
    name,
    nameAttrs,
    status,
    statusAttrs,
    priceFrom,
    priceFromAttrs,
    priceTo,
    priceToAttrs,
    errors,
    data,
    onSearch,
    onResetSearch,
    onChangePage,
    onChangePerPage
  }
}

export default useGetProductsHook
