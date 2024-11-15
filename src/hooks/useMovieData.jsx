import { useState, useEffect } from 'react'
import {
  getBoxOfficeMovies,
  getMovieDetail,
  searchMovies,
  getMovieImages,
  getRecommendedMovies,
} from '@/apis/movieApi'

function useMovieData(type, queryOrId = null) {
  const [data, setData] = useState([])
  const [isLoading, setLoading] = useState(true)
  const [isError, setError] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        let result
        switch (type) {
          case 'boxOffice':
            result = await getBoxOfficeMovies()
            break
          case 'details':
            result = await getMovieDetail(queryOrId) // movieId 사용
            break
          case 'search':
            result = await searchMovies(queryOrId) // 검색어 사용
            break
          case 'images':
            result = await getMovieImages(queryOrId) // movieId 사용
            break
          case 'recommend':
            result = await getRecommendedMovies()
            break
          default:
            throw new Error('유효하지 않은 API 요청 유형')
        }
        setData(Array.isArray(result) ? result : []) // 배열 여부 확인 후 설정
        console.log(result)
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [type, queryOrId])

  return { data, isLoading, isError }
}

export default useMovieData
