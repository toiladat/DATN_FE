import { authRequests } from '@/apis/requests/auth'
import { useMutation } from '@tanstack/react-query'

export const useGetNonce = () => {
  return useMutation({
    mutationFn: async (walletAddress: string) => {
      const res = await authRequests.getNonce(walletAddress)
      return res.data
    }
  })
}

export const useLogin = () => {
  return useMutation({
    mutationFn: async (payload: {
      walletAddress: string
      signature: string
    }) => {
      const res = await authRequests.login(payload)
      return res.data
    }
  })
}
