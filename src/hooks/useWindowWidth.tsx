import { useEffect, useState } from 'react'

export default function useWindowWidth() {
  const [width, setWidth] = useState<number>(window.innerWidth)

  useEffect(() => {
    function getWidth() {
      setWidth(window.innerWidth)
    }
    window.addEventListener('resize', getWidth)
    return () => {
      window.removeEventListener('resize', getWidth)
    }
  }, [])
  return width
}
