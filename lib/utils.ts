/**
 * Generate unique buono code
 */
export function generateBuonoCode(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let code = ''
  for (let i = 0; i < 10; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return code
}

/**
 * Format price in EUR
 */
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('it-IT', {
    style: 'currency',
    currency: 'EUR',
  }).format(price)
}

/**
 * Format date in Italian
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('it-IT', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date)
}

/**
 * Format time HH:mm
 */
export function formatTime(timeString: string): string {
  return timeString.substring(0, 5)
}

/**
 * Check if date is in the past
 */
export function isDatePast(dateString: string): boolean {
  const date = new Date(dateString)
  return date < new Date()
}

/**
 * Check if 7 days have passed since date
 */
export function hasPassedSevenDays(dateString: string): boolean {
  const date = new Date(dateString)
  const now = new Date()
  const diffTime = Math.abs(now.getTime() - date.getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays > 7
}

/**
 * Get first letter of email for avatar
 */
export function getAvatarLetter(email: string): string {
  return email.charAt(0).toUpperCase()
}
