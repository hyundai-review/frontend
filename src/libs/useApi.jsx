import { authenticated, nonAuthenticated } from '@/libs/axiosInstance'
import { useState } from 'react'

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

  const request = async (method, url, data = null) => {
    try {
      setLoading(true)
      setError(null)
      const response = await api({ method, url, data })
      return response
      //
    } catch (err) {
      setError(err.response?.data || err.message)

      const errorMessage = ERROR_MESSAGES[err.response?.status]
      if (errorMessage) {
        alert(errorMessage)
      }
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
