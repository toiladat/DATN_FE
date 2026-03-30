import { AuthProvider } from '@/components/providers/AuthProvider'
import { wagmiConfig } from '@/shared/config/wagmiConfig'
import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { type ReactNode, useEffect, useState } from 'react'
import { WagmiProvider } from 'wagmi'

export function ClientOnly({ children }: { children: ReactNode }) {
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
  }, [])

  if (!hasMounted) {
    return null
  }

  return <>{children}</>
}

export function Web3ClientProvider({ children }: { children: ReactNode }) {
  return (
    <ClientOnly>
      <WagmiProvider config={wagmiConfig}>
        <RainbowKitProvider>
          <AuthProvider>{children}</AuthProvider>
        </RainbowKitProvider>
      </WagmiProvider>
    </ClientOnly>
  )
}
