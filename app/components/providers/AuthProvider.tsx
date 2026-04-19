import { useGetNonce, useLogin } from '@/apis/queries/auth'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { toast } from 'sonner'
import { useAccount, useDisconnect, useSignMessage } from 'wagmi'

interface AuthContextType {
  isAuthenticated: boolean
  logout: () => void
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  logout: () => {}
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { address, isConnected, status } = useAccount()
  const { disconnect } = useDisconnect()
  const { signMessageAsync } = useSignMessage()
  const { mutateAsync: getNonce } = useGetNonce()
  const { mutateAsync: login } = useLogin()

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [isAuthenticating, setIsAuthenticating] = useState<boolean>(false)

  // Initialize auth state
  useEffect(() => {
    const token =
      typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null
    if (token) {
      setIsAuthenticated(true)
    }
  }, [])

  const logout = () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    setIsAuthenticated(false)
    disconnect()
  }

  // Handle Wallet Connection Authentication Flow
  useEffect(() => {
    const authenticateWallet = async () => {
      // Direct local storage check to avoid race conditions during React rendering
      const hasToken =
        typeof window !== 'undefined'
          ? !!localStorage.getItem('accessToken')
          : false

      // Only prompt signing if wallet is truly connected, and we aren't currently authenticating or authenticated.
      if (
        isConnected &&
        address &&
        !isAuthenticated &&
        !isAuthenticating &&
        !hasToken
      ) {
        setIsAuthenticating(true)
        try {
          // 1. Fetch nonce from BE
          const nonceRes: any = await getNonce(address)
          if (!nonceRes || !nonceRes.nonce) {
            throw new Error('Failed to fetch nonce')
          }

          // 2. Prompt user to sign the message
          const signature = await signMessageAsync({ message: nonceRes.nonce })

          // 3. Login to get token
          const loginRes: any = await login({
            walletAddress: address,
            signature
          })

          if (loginRes && loginRes.accessToken) {
            localStorage.setItem('accessToken', loginRes.accessToken)
            if (loginRes.refreshToken) {
              localStorage.setItem('refreshToken', loginRes.refreshToken)
            }
            setIsAuthenticated(true)
            toast.success('Wallet authenticated successfully!')
          } else {
            throw new Error('Invalid login response')
          }
        } catch (error: any) {
          console.error('Wallet authentication error:', error)
          toast.error(
            error?.message || 'Failed to authenticate wallet. Please try again.'
          )
          // Clean state and disconnect on failure or cancel
          disconnect()
        } finally {
          setIsAuthenticating(false)
        }
      }
    }

    authenticateWallet()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected, address, isAuthenticated])

  // Sync state if user manually disconnects from wallet extension side
  // Avoid race conditions during Wagmi page-load re-hydration where isConnected is momentarily false
  useEffect(() => {
    if (status === 'disconnected' && isAuthenticated) {
      logout()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, isAuthenticated])

  return (
    <AuthContext.Provider value={{ isAuthenticated, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
