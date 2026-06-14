import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

import i18n from './locales/i18n'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getErrorMessage = (err: any, defaultMsg: string) => {
  const isRejected =
    err?.code === 4001 ||
    err?.name === 'UserRejectedRequestError' ||
    err?.message?.includes('User rejected the request') ||
    err?.message?.includes('User denied transaction signature')

  if (isRejected) {
    return i18n.t('toast.tx_rejected')
  }

  const data = err?.response?.data
  let msg = defaultMsg

  if (data?.errors?.[0]?.message) {
    msg = data.errors[0].message
  } else if (Array.isArray(data?.message) && data.message.length > 0) {
    const firstMsg = data.message[0]
    msg =
      typeof firstMsg === 'object' && firstMsg !== null
        ? firstMsg.message || defaultMsg
        : firstMsg || defaultMsg
  } else if (typeof data?.message === 'string') {
    msg = data.message
  }

  // Convert standard key format if it's like 'Error.UserKYCRequired'
  const errorKey = msg.startsWith('Error.') ? `error.${msg.substring(6)}` : msg

  if (i18n.exists(errorKey)) {
    return i18n.t(errorKey)
  }

  return msg
}
