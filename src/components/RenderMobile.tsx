import { ReactNode } from 'react'
import { MOBILE_BREAKPOINT } from '../constants/responsive'

interface Props {
  children: ReactNode
  width: number
}

export function RenderMobile({ children, width }: Props) {
  if (width > MOBILE_BREAKPOINT) {
    return null
  }
  return <div>{children}</div>
}
