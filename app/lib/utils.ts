import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

import { ERROR_MESSAGES } from './errors'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getErrorMessage = (err: any, defaultMsg: string) => {
  const data = err?.response?.data
  let msg = defaultMsg

  if (data?.errors?.[0]?.message) {
    msg = data.errors[0].message
  } else if (Array.isArray(data?.message) && data.message[0]?.message) {
    msg = data.message[0].message
  } else if (typeof data?.message === 'string') {
    msg = data.message
  }

  return ERROR_MESSAGES[msg] || msg
}
