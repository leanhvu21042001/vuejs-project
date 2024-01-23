import http from '~/utils/http'

class AuthService {
  async getMe() {
    return (await http.get('/me')).data
  }

  async login({ email, password }) {
    const res = await http.post('/auth/login', {
      email,
      password
    })
    return res.data
  }

  async logout() {
    const res = await http.post('/auth/logout')
    return res.data
  }
}

export default new AuthService()
