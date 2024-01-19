import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

export const useProductStore = defineStore('productStore', () => {
  const paginate = ref([])
  const minPrice = ref(0)
  const maxPrice = ref(0)

  const setPaginateData = (data) => {
    paginate.value = data
  }

  const setMinPrice = (min) => {
    minPrice.value = min
  }

  const setMaxPrice = (max) => {
    maxPrice.value = max
  }

  const total = computed(() => paginate.value?.total ?? 0)
  const from = computed(() => paginate.value?.from ?? 0)
  const to = computed(() => paginate.value?.to ?? 0)
  const lastPage = computed(() => paginate.value?.last_page ?? 0)
  const links = computed(() => paginate.value?.links ?? [])
  const products = computed(() => {
    // console.log({ data: paginate.value })
    return paginate.value?.data ?? []
  })

  return {
    total,
    from,
    to,
    lastPage,
    links,
    products,
    setMinPrice,
    setMaxPrice,
    setPaginateData
  }
})
