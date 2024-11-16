import { authenticated, nonAuthenticated } from '@/libs/axiosInstance'
import { useState } from 'react'

export const useApi = (requireAuth = true) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const api = requireAuth ? authenticated : nonAuthenticated

  const request = async (method, url, data = null) => {
    try {
      setLoading(true)
      setError(null)
      const response = await api({ method, url, data })
      return response.data
      //
    } catch (err) {
      setError(err.response?.data || err.message)
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
