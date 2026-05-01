import { apiClient } from '@/apis/axios'

export const userRequests = {
  getMe: () => apiClient.get('/users/me'),
  updateMe: (data: any) => apiClient.put('/users/me', data),
  searchUsers: (keyword: string) => apiClient.get('/users/search', { keyword })
}
