import { NavLink } from 'react-router-dom'
import { NAV_BAR_ROUTES } from '../constants/navBarRoutes'

interface Props {
  setIsNavOpen: (value: boolean) => void
}

export function Navigation({ setIsNavOpen }: Props) {
  return (
    <>
      {NAV_BAR_ROUTES.map((route) => {
        return (
          <NavLink
            key={route.path}
            to={`${route.path}`}
            style={({ isActive }) =>
              isActive ? { color: '#B04342' } : { color: '#616161' }
            }
            className={`${route.style} hover:bg-green-100 lg:hover:bg-transparent py-3 lg:p-0 px-10 w-full lg:w-fit`}
            onClick={() => setIsNavOpen(false)}
          >
            {route.icon}
            {route.title}
          </NavLink>
        )
      })}
    </>
  )
}
