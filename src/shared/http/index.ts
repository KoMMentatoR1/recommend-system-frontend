import axios from 'axios'

export const API_URL: string = `http://127.0.0.1:8000`

const $api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
})

$api.interceptors.request.use(config => {
  const newConfig = { ...config }
  newConfig.headers = {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  }
  return newConfig
})

export default $api
