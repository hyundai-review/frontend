import { useState, useEffect } from 'react'

function useResponsive() {
  const [screenSize, setScreenSize] = useState(getScreenSize())

  function getScreenSize() {
    const width = window.innerWidth
    if (width < 768) return 'small'
    if (width >= 768 && width < 1440) return 'medium'
    return 'large'
  }

  useEffect(() => {
    const handleResize = () => setScreenSize(getScreenSize())

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return screenSize
}

export default useResponsive
