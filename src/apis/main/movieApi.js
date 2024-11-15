import { nonAuthenticated } from '@/libs/axiosInstance'

export const getBoxOfficeMovies = async () => {
  try {
    const response = await nonAuthenticated.get('/api/movies/boxoffice')
    return response.data.movies
  } catch (error) {
    console.error('박스오피스 영화 목록 불러오기 실패:', error)
    throw error
  }
}
