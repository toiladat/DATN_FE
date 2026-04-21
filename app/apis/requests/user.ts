import { apiClient } from '@/apis/axios'

export const userRequests = {
  getMe: (address: string) =>
    apiClient.get('/users/me', { address: address.toLowerCase() }),
  searchUsers: (keyword: string) => apiClient.get('/users/search', { keyword })
}
