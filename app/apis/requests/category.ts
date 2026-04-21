import { apiClient } from '@/apis/axios'

export interface Category {
  id: string
  name: string
  slug: string
}

export const categoryRequests = {
  getCategories: async () => {
    return apiClient.get<{ categories: Category[] }>('/categories')
  }
}
