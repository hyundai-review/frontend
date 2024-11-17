import { authenticated, nonAuthenticated } from '@/libs/axiosInstance'
// 박스오피스 영화 목록 조회
export const getBoxOfficeMovies = async () => {
  try {
    const response = await nonAuthenticated.get('/api/movies/boxoffice')
    return response.data.movies
  } catch (error) {
    console.error('박스오피스 영화 목록 불러오기 실패:', error)
    throw error
  }
}
// 특정 영화 상세 정보 조회
export const getMovieDetail = async (movieId) => {
  try {
    const response = await nonAuthenticated.get(`/api/movies/details/${movieId}`)
    return response.data
  } catch (error) {
    console.error('영화 상세 페이지 에러났다! 해결해줘!', error)
    throw error
  }
}

// 영화 검색
export const searchMovies = async (query) => {
  try {
    const response = await nonAuthenticated.get(`/api/movies/search`, {
      params: { query },
    })
    return response.data.movies
  } catch (error) {
    console.error('영화 검색 실패:', error)
    throw error
  }
}

// 영화 포스터/스틸컷 조회
export const getMovieImages = async (movieId) => {
  try {
    const response = await authenticated.get(`/api/movies/images/${movieId}`)
    return response.data.images
  } catch (error) {
    console.error('영화 이미지 불러오기 실패:', error)
    throw error
  }
}

// 추천 영화 리스트 조회
export const getRecommendedMovies = async () => {
  try {
    const response = await authenticated.get('/api/movies/recommend')
    return response.data.movies
  } catch (error) {
    console.error('추천 영화 목록 불러오기 실패:', error)
    throw error
  }
}
