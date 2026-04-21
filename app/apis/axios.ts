import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
  withCredentials: true
})

api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('accessToken')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
  }
  return config
})

export default api

export const apiClient = {
  get: <T = any>(url: string, params?: any) => api.get<T>(url, { params }),
  post: <T = any>(url: string, body: any) => api.post<T>(url, body),
  put: <T = any>(url: string, body: any) => api.put<T>(url, body),
  delete: <T = any>(url: string, data?: any) => api.delete<T>(url, { data })
}
