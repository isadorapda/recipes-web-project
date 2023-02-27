interface Actionables {
  image: string
  value: string
  header: string
  description: string
}

export const PANTRY_ACTIONABLES: Actionables[] = [
  {
    image: '/assets/shopping-cart.png',
    value: 'shopping cart',
    header: 'save on time',
    description:
      ' Avoid unnecessary trips to the store by cooking with ingredients you have at home.',
  },
  {
    image: '/assets/shopping-basket.png',
    value: 'shopping basket',
    header: 'save on groceries',
    description:
      'Reduce food waste (and save your cash!) by using up the food you have.',
  },
]
