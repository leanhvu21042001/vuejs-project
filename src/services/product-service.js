import http from '~/utils/http'

class ProductService {
  async getProducts({
    page = 1,
    perPage = 10,
    name = '',
    status = '',
    priceFrom = '',
    priceTo = ''
  }) {
    const res = await http.get(
      `/product?page=${page}&perPage=${perPage}&name=${name}&status=${status}&price_from=${priceFrom}&price_to=${priceTo}`
    )

    const paginate = res.data?.paginate ?? {}
    const minPrice = res.data?.minPrice ?? 0
    const maxPrice = res.data?.maxPrice ?? 0
    const total = paginate?.total ?? 0
    const from = paginate?.from ?? 0
    const to = paginate?.to ?? 0
    const lastPage = paginate?.lastPage ?? 0
    const links = paginate?.links ?? []
    const products = paginate?.data ?? []
    const isShowPaginate = total > 20

    return {
      minPrice,
      maxPrice,
      total,
      from,
      to,
      lastPage,
      links,
      isShowPaginate,
      products
    }
  }

  async createProduct({ name, price, description, isSales, fileUpload }) {
    const res = await http.post(
      'product',
      {
        name,
        price,
        description,
        is_sales: isSales,
        fileUpload
      },
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    )
    return res.data
  }
}

export default new ProductService()
