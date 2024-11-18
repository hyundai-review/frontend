import { nonAuthenticated } from '@/libs/axiosInstance'

const auth_code_path = 'https://kauth.kakao.com/oauth/authorize'
const rest_api_key = import.meta.env.VITE_REST_API_KEY
const redirect_url = import.meta.env.VITE_REDIRECT_URL

export const GET_KakaoLoginLink = () => {
  const kakaoURL = `${auth_code_path}?client_id=${rest_api_key}&redirect_uri=${redirect_url}&response_type=code`
  return kakaoURL
}

export const GET_AccessToken = async (authCode) => {
  try {
    const res = await nonAuthenticated.post(`/auth/login`, {
      authorizationCode: `${authCode}`,
    })
    return res.data
  } catch (error) {
    throw error
  }
}
