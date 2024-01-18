import http from '~/utils/http'

class ProductService {
  async getProducts() {
    try {
      return http.get('/products')
    } catch (error) {
      console.error(error)
    }
  }
}

export default new ProductService()
