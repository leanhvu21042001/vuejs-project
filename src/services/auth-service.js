import http from '~/utils/http'

class AuthService {
  async getMe() {
    return http.get('/me')
  }

  async login({ email, password }) {
    const res = await http.post('/auth/login', {
      email,
      password
    })
    return res.data
  }
}

export default new AuthService()
