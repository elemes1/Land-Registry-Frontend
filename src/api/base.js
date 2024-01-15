import axios from 'axios'

const api_base_url = import.meta.env.VITE_API_BASE_URL
const api_port = import.meta.env.VITE_API_PORT

export default function apiHandler(url = `${api_base_url}:${api_port}`) {
  let defaultHeader = {
    'Content-Type': 'application/json',
    Accept: 'application/json'
    // 'Access-Control-Allow-Origin': '*'
    // 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
  }

  const setupHeaders = () => {
    let result = null
    switch (true) {
      default:
        result = defaultHeader
        break
    }
    return result
  }

  const axiosInstance = axios.create({
    baseURL: url,
    headers: setupHeaders()
  })

  return axiosInstance
}
