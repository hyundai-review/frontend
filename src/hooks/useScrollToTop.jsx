import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const useScrollToTop = () => {
  const location = useLocation()

  useEffect(() => {
    // 페이지 이동 시 스크롤을 최상단으로 이동
    window.scrollTo(0, 0)
  }, [location.pathname]) // pathname이 변경될 때마다 실행
}

export default useScrollToTop
