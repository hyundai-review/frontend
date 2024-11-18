import { useState, useEffect, useRef } from 'react'

export const useInfiniteScroll = (fetchData, hasNext, loading) => {
  const [data, setData] = useState([]) // 누적 데이터
  const [page, setPage] = useState(0) // 현재 페이지
  const observerRef = useRef(null) // IntersectionObserver 대상 Ref

  const loadMore = async () => {
    if (loading || !hasNext) return // 로딩 중이거나 더 가져올 데이터가 없으면 중단
    try {
      const newData = await fetchData(page)
      setData((prev) => [...prev, ...newData])
      setPage((prev) => prev + 1)
    } catch (err) {
      console.error('데이터 로드 실패:', err)
    }
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasNext && !loading) {
          loadMore()
        }
      },
      { threshold: 1.0 },
    )

    if (observerRef.current) observer.observe(observerRef.current)

    return () => {
      if (observerRef.current) observer.unobserve(observerRef.current)
    }
  }, [hasNext, loading])

  return { data, observerRef }
}
