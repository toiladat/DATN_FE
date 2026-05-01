import { apiClient } from '@/apis/axios'

export const authRequests = {
  login: (data: { walletAddress: string; signature: string }) =>
    apiClient.post('/auth/wallet-login', data),
  getNonce: (walletAddress: string) =>
    apiClient.get('/auth/nonce', { walletAddress }),
  requestEmailVerification: (email: string) =>
    apiClient.post('/auth/request-verification', { email }),
  verifyEmail: (data: { email: string; code: string }) =>
    apiClient.post('/auth/verify-email', data)
}
