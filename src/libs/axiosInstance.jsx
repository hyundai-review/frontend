import { getCookie } from '@/utils/cookie'
import axios from 'axios'

// 인증 필요 없는 경우
export const nonAuthenticated = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}`,
})

// 인증 필요한 경우
export const authenticated = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}`,
})

/** 요청 인터셉터 : 헤더에 access token 추가 */
authenticated.interceptors.request.use((config) => {
  // const ACCESS_TOKEN = getCookie('ACCESS_TOKEN')
  const ACCESS_TOKEN =
    'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIzIiwiaWF0IjoxNzMxNjU1NjU2LCJleHAiOjE3MzE2NTc0NTZ9.dJU0P0Hw_FENyaScYh7yvXPuEOxxjZfpSesp-BnCejt0hKjIsmXrTe8hZgyMLm8bLb43pt2A1Ng7wWt5zrQjgw'

  if (ACCESS_TOKEN) {
    config.headers['Authorization'] = `Bearer ${ACCESS_TOKEN}`
  } else {
    // 로그인 페이지로 이동
    window.location.href = '/user/login'
  }
  return config
})

/** 응답 인터셉터 */
authenticated.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    // access token 만료된 경우
    if (error.response && error.response.status === 401) {
      alert('재로그인 필요')
      window.location.href = '/user/login'

      // refreshtoken 로직 추가 예정
      // try {
      //   // refreshtoken 요청 로직
      // } catch (error) {
      // }
    }
  },
)
