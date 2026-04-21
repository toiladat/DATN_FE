import { useQuery } from '@tanstack/react-query'
import { categoryRequests, type Category } from '../requests/category'

export const useGetCategories = () => {
  return useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: async () => {
      const response = await categoryRequests.getCategories()
      return response.data?.categories || []
    },
    staleTime: 1000 * 60 * 60 * 24 // 24 hours caching since categories rarely change
  })
}
