/**
 * Decode JWT payload from localStorage accessToken.
 * Returns null if no token or token is malformed.
 * No signature verification — client-side only for UI gating.
 */
export function getTokenPayload(): Record<string, any> | null {
  if (typeof window === 'undefined') return null
  const token = localStorage.getItem('accessToken')
  if (!token) return null
  try {
    const [, payloadB64] = token.split('.')
    const json = atob(payloadB64.replace(/-/g, '+').replace(/_/g, '/'))
    return JSON.parse(json)
  } catch {
    return null
  }
}

/** Returns the userId (sub) from the current access token, or null if not logged in. */
export function getCurrentUserId(): string | null {
  const payload = getTokenPayload()
  return payload?.userId ?? payload?.sub ?? null
}
