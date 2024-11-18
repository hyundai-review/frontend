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
  // const ACCESS_TOKEN =
  // 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI1IiwiaWF0IjoxNzMxODQxMjQ1LCJleHAiOjE3MzE4NDMwNDV9.aOWYyTAo17a5zwyh6nZzjUIVitgPaoYcZaVyscQOEdR5m4k1L83YUFaNOIDYQfFlpylKuiCQ9emsDboz1Zs7uQ'

  // const ACCESS_TOKEN = getCookie('ACCESS_TOKEN')

  // TODO(k) 임시 엑세스 토큰
  const ACCESS_TOKEN =
    'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI0IiwiaWF0IjoxNzMxOTA1OTc1LCJleHAiOjE3MzE5MDc3NzV9.SkJfD-P4JfLDgxFSakN5k0A7dCbjN5t3YimlzVvuoC4Thlug4Q1IV8979V85lHTdPM8miLeRxl-amsclu5a4DQ'

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
    if (error.response && error.response.status === 401) {
      alert('재로그인 필요')
      window.location.href = '/user/login'
      try {
        //TODO(j) refreshtoken 요청 로직
        const newAccessToken = await nonAuthenticated.post('/auth/refresh')
        setCookie('ACCESS_TOKEN', newAccessToken, 7)
      } catch (error) {
        console.log(error)
      }
    }

    return Promise.reject(error)
  },
)
