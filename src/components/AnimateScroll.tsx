import { useRef } from 'react'
import useElementOnScreen from '../hooks/useElementOnScreen'

interface Props {
  children: React.ReactNode
}

export function AnimateScroll({ children }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const onScreen = useElementOnScreen(ref)
  return (
    <div
      ref={ref}
      className={`${
        onScreen
          ? 'opacity-0 translate-y-32 md:translate-y-56'
          : 'opacity-100 translate-y-[none]'
      } transition-[opacity,translate] duration-700 ease-in-out`}
    >
      {children}
    </div>
  )
}
