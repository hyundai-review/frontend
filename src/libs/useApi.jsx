import { useState } from 'react'
import { authenticated, nonAuthenticated } from './axiosInstance'

const ERROR_MESSAGES = {
  409: '이미 리뷰를 작성하셨습니다.',
  401: '로그인이 필요합니다.',
  403: '권한이 없습니다.',
  404: '찾을 수 없습니다',
}

export const useApi = (requireAuth = true) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const api = requireAuth ? authenticated : nonAuthenticated

  /**
   * @param {*} data // post 시 보낼 데이터
   * @param {*} isMultipart 데이터가 multipart/form-data 형식인지 여부
   */
  const request = async (method, url, data = null, isMultipart = false) => {
    try {
      setLoading(true)
      setError(null)

      // const config = isMultipart ? { headers: { 'Content-Type': 'multipart/form-data' } } : {}
      // multipart/form-data의 경우 별도의 config 설정하지 않음
      const config = {}

      // FormData가 아닌 경우에만 JSON으로 변환
      if (!isMultipart) {
        config.headers = { 'Content-Type': 'application/json' }
      }

      // 테스트용 지연 추가

      const response = await api({ method, url, data, ...config })

      return response
      //
    } catch (err) {
      setError(err.response?.data || err.message)

      const errorMessage = ERROR_MESSAGES[err.response?.status]
      // if (errorMessage) {
      //   alert(errorMessage)
      // }

      throw err
      //
    } finally {
      setLoading(false)
    }
  }

  return {
    loading,
    error,
    get: (url) => request('get', url),
    post: (url, data) => request('post', url, data),
    put: (url, data) => request('put', url, data),
    delete: (url) => request('delete', url),
  }
}
