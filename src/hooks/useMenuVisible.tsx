import { useEffect, useRef, useState } from 'react'

export default function useMenuVisible(initialIsVisible: boolean) {
  const [isMenuVisible, setIsMenuVisible] = useState(initialIsVisible)
  const ref = useRef<HTMLDivElement>(null)

  const handleClickOutside = (event: any) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setIsMenuVisible(false)
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true)
    return () => {
      document.removeEventListener('click', handleClickOutside, true)
    }
  }, [])
  return { ref, isMenuVisible, setIsMenuVisible }
}
