import axios from 'axios'

const request = axios.create({
  baseURL: import.meta.env.VITE_API_URL + import.meta.env.VITE_BASE_URL,
  timeout: 10 * 1000,

  headers: {
    'Content-Type': 'application/json',
  },
})

request.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

request.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    return Promise.reject(error)
  },
)
export default request
