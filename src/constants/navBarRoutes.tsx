import { BsBasket } from 'react-icons/bs'

interface NavBar {
  title: string
  path: string
  icon?: JSX.Element
  style?: string
}

export const NAV_BAR_ROUTES: NavBar[] = [
  {
    path: '/',
    title: 'home',
  },
  {
    path: 'search-recipes',
    title: 'search',
  },
  {
    path: 'whats-in-your-fridge',
    title: "what's in your fridge?",
  },
  {
    path: 'saved',
    title: 'saved',
  },
  {
    path: 'grocery-list',
    title: 'grocery list',
    icon: <BsBasket className="w-[14px] lg:w-4 mt-[2px]" />,
    style: 'flex gap-3',
  },
]
