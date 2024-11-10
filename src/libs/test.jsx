import axios from 'axios'

const ACCESS_TOKEN = 'actk'
const REFREASH_TOKEN = 'rftk'

export const unauthenicated = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_KAKAO_URL}`,
})

export const authenticated = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}`,
})

// 요청 보내기 전 access token 헤더에 추가
authenticated.interceptors.request.use((config) => {
  config.headers['Authorization'] = localStorage.getItem(ACCESS_TOKEN)
  return config
})

// 액세스 토큰 만료되었을 경우 refresh token 헤더에 추가
const refreshAccessToken = async (originRequest) => {
  const refreshToken = localStorage.getItem(REFREASH_TOKEN)

  if (!refreshToken) throw new Error('유효하지 않은 토큰값 입니다')

  originRequest.headers['Authorization-refresh'] = `Bearer ${refreshToken}`
  try {
    const response = await axios(originRequest)
    const newAccessToken = response.headers.accessToken

    localStorage.setItem(ACCESS_TOKEN, newAccessToken)
    originRequest.headers['Authorization'] = `Bearer ${newAccessToken}`

    return axios(originRequest)
  } catch {
    throw new Error('액세스 토큰 갱신에 실패했습니다.')
  }
}

axios.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    const originRequest = error.config

    // 엑세스 토큰 만료된 경우
    if (error.response && error.response.status === 401) {
      try {
        const newRequest = await refreshAccessToken(originRequest)

        return newRequest
      } catch (refreshError) {
        // 리프레시 토큰도 만료된 경우
        alert('다시 로그인을 하세요.')
        return Promise.reject(refreshError)
      }
    }
  },
)
