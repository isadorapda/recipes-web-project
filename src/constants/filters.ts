import { Options } from '../types/models'

export const DIET_TYPES: Options = [
  {
    value: 'vegan',
    label: 'Vegan',
  },
  {
    value: 'vegetarian',
    label: 'Vegetarian',
  },
  {
    value: 'glutenFree',
    label: 'Gluten Free',
  },
  {
    value: 'dairyFree',
    label: 'Dairy Free',
  },
  {
    value: 'sustainable',
    label: 'Sustainable',
  },
  {
    value: 'lowFodmap',
    label: 'Low Fodmap',
  },
  {
    value: 'ketogenic',
    label: 'Ketogenic',
  },
  {
    value: 'lactoVegetarian',
    label: 'Lacto-Vegetarian',
  },
  {
    value: 'ovoVegetarian',
    label: 'Ovo-Vegetarian',
  },
  {
    value: 'pescetarian',
    label: 'Pescetarian',
  },
  {
    value: 'paleo',
    label: 'Paleo',
  },
]

export const MEAL_TYPES: Options = [
  {
    value: 'main course',
    label: 'Main Course',
  },
  {
    value: 'snack',
    label: 'Snack',
  },
  {
    value: 'side dish',
    label: 'Side Dish ',
  },
  {
    value: 'dessert',
    label: ' Dessert',
  },
  {
    value: 'appetizer',
    label: 'Appetizer',
  },
  {
    value: 'salad',
    label: 'Salad',
  },
  {
    value: 'bread',
    label: 'Bread',
  },
  {
    value: 'breakfast',
    label: 'Breakfast',
  },
  {
    value: 'soup',
    label: 'Soup',
  },
  {
    value: 'beverage',
    label: 'Beverage',
  },
  {
    value: 'drink',
    label: 'Drink',
  },
  {
    value: 'sauce',
    label: 'Sauce',
  },
  {
    value: 'marinade',
    label: 'Marinade',
  },
  {
    value: 'fingerfood',
    label: 'Fingerfood',
  },
]

export const FOOD_INTOLERANCES: Options = [
  {
    value: 'dairy',
    label: 'Dairy',
  },
  {
    value: 'ggg',
    label: 'Egg',
  },
  {
    value: 'gluten',
    label: 'Gluten',
  },
  {
    value: 'grain',
    label: 'Grain',
  },
  {
    value: 'peanut',
    label: 'Peanut',
  },
  {
    value: 'seafood',
    label: 'Seafood',
  },
  {
    value: 'sesame',
    label: 'Sesame',
  },
  {
    value: 'shellfish',
    label: 'Shellfish',
  },
  {
    value: 'soy',
    label: 'Soy',
  },
  {
    value: 'sulfite',
    label: 'Sulfite',
  },
  {
    value: 'treeNut',
    label: 'Tree Nut',
  },
]

export const CUISINE: Options = [
  {
    value: 'african',
    label: 'African',
  },
  {
    value: 'american',
    label: 'American',
  },
  {
    value: 'british',
    label: 'British',
  },
  {
    value: 'caribbean',
    label: ' Caribbean',
  },
  {
    value: 'chinese',
    label: 'Chinese',
  },
  {
    value: 'easternEuropean',
    label: 'Eastern European',
  },
  {
    value: 'european',
    label: 'European',
  },
  {
    value: 'french',
    label: ' French',
  },
  {
    value: 'german',
    label: 'German',
  },
  {
    value: 'greek',
    label: 'Greek',
  },
  {
    value: 'indian',
    label: ' Indian',
  },
  {
    value: 'irish',
    label: ' Irish',
  },
  {
    value: 'italian',
    label: 'Italian',
  },
  {
    value: 'japanese',
    label: 'Japanese',
  },
  {
    value: 'jewish',
    label: ' Jewish',
  },
  {
    value: 'korean',
    label: ' Korean',
  },
  {
    value: 'latinAmerican',
    label: ' Latin American',
  },
  {
    value: 'mediterranean',
    label: 'Mediterranean',
  },
  {
    value: 'mexican',
    label: 'Mexican',
  },
  {
    value: 'middleEastern',
    label: ' Middle Eastern',
  },
  {
    value: 'spanish',
    label: ' Spanish',
  },
  {
    value: 'thai',
    label: ' Thai',
  },
  {
    value: 'vietnamese',
    label: 'Vietnamese',
  },
]
export const SORT: Options = [
  {
    label: 'Quicker',
    value: 'time',
    direction: 'asc',
  },
  {
    label: 'Popularity',
    value: 'popularity',
    direction: 'desc',
  },

  {
    label: 'Healthiness',
    value: 'healthiness',
    direction: 'desc',
  },
  {
    label: 'Cheapest',
    value: 'price',
    direction: 'asc',
  },
]
