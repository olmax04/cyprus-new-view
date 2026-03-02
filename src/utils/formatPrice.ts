const CURRENCY_CONFIG: Record<string, { symbol: string; locale: string }> = {
  EUR: { symbol: '€', locale: 'de-DE' },
  USD: { symbol: '$', locale: 'en-US' },
  GBP: { symbol: '£', locale: 'en-GB' },
}

export function formatPrice(price: number, currency: string = 'EUR'): string {
  const config = CURRENCY_CONFIG[currency] || CURRENCY_CONFIG.EUR

  const formatted = new Intl.NumberFormat(config.locale, {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(price)

  return formatted
}
