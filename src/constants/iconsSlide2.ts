import GlutenFree from '../assets/gluten-free.svg'
import Diets from '../assets/vegan.svg'
import Dish from '../assets/meal-type.svg'
import Cuisine from '../assets/cuisine.svg'
import Other from '../assets/filters.svg'

interface Image {
  image: string
  title: string
}

export const ICONS_FILTERS: Image[] = [
  {
    image: `${Diets}`,
    title: 'diet types',
  },
  {
    image: `${GlutenFree}`,
    title: 'food intolerances or allergies',
  },
  {
    image: `${Dish}`,
    title: 'dish types',
  },
  {
    image: `${Cuisine}`,
    title: 'cuisine',
  },
  {
    image: `${Other}`,
    title: 'other filters',
  },
]
