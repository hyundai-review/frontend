import { getCookie, setCookie } from '@/utils/cookie'
import axios from 'axios'

// 인증 필요 없는 경우
export const nonAuthenticated = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}/api`,
})

// 인증 필요한 경우
export const authenticated = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}/api`,
})

/** 요청 인터셉터 : 헤더에 access token 추가 */
authenticated.interceptors.request.use((config) => {
  // const ACCESS_TOKEN = getCookie('ACCESS_TOKEN')
  const ACCESS_TOKEN =
    'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIzIiwiaWF0IjoxNzMyMDMzMDg2LCJleHAiOjE3MzIwMzQ4ODZ9.g_xZ1ZaY9SOi3WoFyxABB5lGiaZE5I9ejm7-408X4RLTDj24pZizpcAeg8VWfu79SiwGV8rwhQjmrHxP6OthfQ'

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
  async (response) => {
    return response
  },
  async (error) => {
    // access token 만료된 경우
    //TODO(j) 400대 에러는 다 추가할 것 (요청사항)
    if (
      (error.response && error.response.status === 401) ||
      (error.response && error.response.status === 403)
    ) {
      try {
        // 리프레시 토큰으로 새로운 액세스 토큰 요청
        const refreshResponse = await nonAuthenticated.post('/auth/refresh')
        const newAccessToken = refreshResponse.data.accessToken

        // 새로운 토큰을 쿠키에 저장
        setCookie('ACCESS_TOKEN', newAccessToken, 7)

        // 원래 요청의 헤더를 업데이트
        error.config.headers['Authorization'] = `Bearer ${newAccessToken}`

        // 원래 요청 재시도
        return authenticated.request(error.config)
      } catch (refreshError) {
        // 로그인 페이지로 이동
        window.location.href = '/user/login'
      }
    }

    return Promise.reject(error)
  },
)
