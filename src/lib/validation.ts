export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
export const PHONE_RE = /^\+?[\d\s-]{9,20}$/

export const digitsCount = (value: string) => value.replace(/\D/g, '').length
