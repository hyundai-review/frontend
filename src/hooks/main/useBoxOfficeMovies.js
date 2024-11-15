import { useState, useEffect } from 'react'
import { getBoxOfficeMovies } from '@/apis/main/movieApi'

function useBoxOfficeMovies() {
  const [boxOfficeMovies, setMovies] = useState([])
  const [isLoading, setLoading] = useState(true)
  const [isError, setError] = useState(null)

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const movieList = await getBoxOfficeMovies() // API 함수 호출
        setMovies(movieList)
        console.log(movieList)
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    fetchMovies()
    console.log(boxOfficeMovies)
  }, [])

  return { boxOfficeMovies, isLoading, isError }
}
export default useBoxOfficeMovies
