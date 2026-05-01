import { userRequests } from '@/apis/requests/user'
import type { UserProfile } from '@/types/user'
import { useQuery } from '@tanstack/react-query'
import type { UserSearchResponse } from '@/schemas/userSchema'

export const useMe = (enabled = true) => {
  return useQuery({
    queryKey: ['me'],
    queryFn: async () => {
      const { data } = await userRequests.getMe()
      return data as {
        avatar?: string | null
        name?: string | null
        status?: string
      }
    },
    enabled,
    staleTime: 1000 * 60 * 5,
    retry: false
  })
}

export const useGetUserProfile = (address?: string) => {
  return useQuery<UserProfile | null, Error>({
    queryKey: ['user-profile', address],
    queryFn: async (): Promise<UserProfile | null> => {
      if (!address) {
        return null
      }

      try {
        const { data } = await userRequests.getMe()

        if (data instanceof Error) {
          throw data
        }

        if (!data || !data.success) {
          // User not found - return null instead of throwing
          return null
        }

        return data.data
      } catch (error: any) {
        // Handle 409 Conflict (User not found) gracefully
        if (error?.response?.status === 409) {
          return null
        }
        console.error('Error fetching user profile:', error)
        throw error
      }
    },
    enabled: !!address,
    retry: false // Don't retry on 409 errors
  })
}

export const useSearchUsers = (keyword: string) => {
  return useQuery({
    queryKey: ['users-search', keyword],
    queryFn: async (): Promise<UserSearchResponse['users']> => {
      const { data } = await userRequests.searchUsers(keyword)
      return data?.users || []
    },
    enabled: !!keyword && keyword.length >= 2,
    staleTime: 1000 * 60 * 5 // 5 minutes
  })
}
