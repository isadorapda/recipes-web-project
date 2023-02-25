export interface CategoryOption {
  label: string
  value: string
  recipesIds: number[]
  path: string
  isChecked: boolean
}

export interface Categories {
  breakfast: CategoryOption
  snacks: CategoryOption
  lunch: CategoryOption
  dinner: CategoryOption
  desserts: CategoryOption
  sides: CategoryOption
  drinks: CategoryOption
}

export const MENU_CATEGORY_OPTIONS: Categories = {
  breakfast: {
    label: 'Breakfast',
    value: 'breakfast',
    recipesIds: [],
    path: '/breakfast',
    isChecked: false,
  },
  snacks: {
    label: 'Snacks',
    value: 'snacks',
    recipesIds: [],
    path: '/snacks',
    isChecked: false,
  },
  lunch: {
    label: 'Lunch',
    value: 'lunch',
    recipesIds: [],
    path: '/lunch',
    isChecked: false,
  },
  dinner: {
    label: 'Dinner',
    value: 'dinner',
    recipesIds: [],
    path: '/dinner',
    isChecked: false,
  },
  desserts: {
    label: 'Desserts',
    value: 'desserts',
    recipesIds: [],
    path: '/desserts',
    isChecked: false,
  },
  sides: {
    label: 'Sides',
    value: 'sides',
    recipesIds: [],
    path: '/sides',
    isChecked: false,
  },
  drinks: {
    label: 'Drinks',
    value: 'drinks',
    recipesIds: [],
    path: '/drinks',
    isChecked: false,
  },
}
