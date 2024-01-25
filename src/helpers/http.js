import axios from 'axios'
import qs from 'qs'
import moment from 'moment'
import { camelizeKeys, decamelizeKeys } from 'humps'

import { FORMAT_DATE } from '~/constants'
import { ServiceError } from './error'

export const http = axios.create({
  baseURL: import.meta.env.VITE_API_ENDPOINT,
  withCredentials: true,
  withXSRFToken: true,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  }
})

http.interceptors.response.use(
  (response) => {
    if (response.data && response.headers['content-type'] === 'application/json') {
      response.data = camelizeKeys(response.data)
    }
    return response
  },
  async (error) => Promise.reject(new ServiceError(error.response.data))
)

http.interceptors.request.use(
  (config) => {
    const newConfig = { ...config }
    newConfig.url = `${config.url}`

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
