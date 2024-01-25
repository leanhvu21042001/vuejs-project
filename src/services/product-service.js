import { http } from '~/helpers'

class ProductService {
  async getProducts({
    page = 1,
    perPage = 10,
    name = '',
    status = '',
    priceFrom = '',
    priceTo = ''
  }) {
    const response = await http.get('product', {
      params: { page, perPage, name, status, price_from: priceFrom, price_to: priceTo }
    })

    const { data: { paginate = {}, minPrice = 0, maxPrice = 0 } = {} } = response
    const { total = 0, from = 0, to = 0, lastPage = 0, links = [], data: products = [] } = paginate
    const isShowPaginate = total > 20

    return { minPrice, maxPrice, total, from, to, lastPage, links, isShowPaginate, products }
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

  async getSingleProduct(id) {
    const res = await http.get(`product/${id}`)
    return res.data
  }

  async updateProduct({ id, name, price, description, isSales, fileUpload, imageName }) {
    const res = await http.post(
      `product/${id}`,
      {
        name,
        price,
        description,
        is_sales: isSales,
        fileUpload,
        imageName,
        // only send file for post. but mirror method for server understand
        _method: 'PATCH'
      },
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    )
    return res.data
  }

  async deleteProduct(id) {
    const res = await http.delete(`product/${id}/delete`)
    return res.data
  }
}

export default new ProductService()
