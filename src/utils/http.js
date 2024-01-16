import axios from 'axios'
import qs from 'qs'
import moment from 'moment'
import { camelizeKeys, decamelizeKeys } from 'humps'

import { FORMAT_DATE } from '@/constants'
import { getToken, removeToken } from './local-storage'

const http = axios.create({
  baseURL: import.meta.env.VITE_API_ENDPOINT,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

http.interceptors.response.use(
  (response) => {
    if (response.data && response.headers['content-type'] === 'application/json') {
      response.data = camelizeKeys(response.data)
    }
    return response.data
  },
  async (error) => {
    const { config, response } = error
    if (config?.url !== '/login' && response?.status === 401) {
      removeToken()
      window.location.reload()
    }

    return Promise.reject(error)
  }
)

http.interceptors.request.use(
  (config) => {
    const authToken = getToken()
    const newConfig = { ...config }
    newConfig.url = `${config.url}`

    if (authToken) {
      newConfig.headers.Authorization = authToken
    }

    newConfig.paramsSerializer = (params) =>
      qs.stringify(params, {
        encode: false,
        serializeDate: (date) => moment(date).format(FORMAT_DATE),
        arrayFormat: 'brackets'
      })

    if (newConfig.headers['Content-Type'] === 'multipart/form-data') {
      return newConfig
    }

    if (config.params) {
      newConfig.params = decamelizeKeys(config.params)
    }

    if (config.data) {
      newConfig.data = decamelizeKeys(config.data)
    }

    return newConfig
  },
  (error) => {
    Promise.reject(error)
  }
)

export default http
