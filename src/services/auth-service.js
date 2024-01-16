import http from '@/utils/http'

class AuthService {
  async getMe() {
    try {
      return http.get('/me')
    } catch (error) {
      console.error(error)
    }
  }
}

export default new AuthService()
