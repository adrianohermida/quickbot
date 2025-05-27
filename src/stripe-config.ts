export const products = {
  'Bot Single': {
    priceId: 'price_1RTCGpFEZT2Uu2jITkILO3Z3',
    name: 'Bot Single',
    description: 'Single bot license',
    mode: 'subscription' as const,
  },
} as const;

export type ProductId = keyof typeof products;