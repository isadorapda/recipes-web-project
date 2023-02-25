import { ReactNode } from 'react'
import { LAPTOP_BREAKPOINT, MOBILE_BREAKPOINT } from '../constants/responsive'

interface Props {
  children: ReactNode
  width: number
}

export function RenderDasktop({ children, width }: Props) {
  if (width <= MOBILE_BREAKPOINT) {
    return null
  }
  return <div>{children}</div>
}
