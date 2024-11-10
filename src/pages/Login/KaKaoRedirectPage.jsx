import { GET_AccessToken } from '@/apis/loginApi'
import React, { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

function KaKaoRedirectPage() {
  const [searchParams] = useSearchParams()
  const authCode = searchParams.get('code')

  useEffect(() => {
    const fetchAccessToken = async () => {
      try {
        await GET_AccessToken(authCode)
      } catch (e) {
        alert('accesstoken 가져오기 axios 연결 실패')
      }
    }

    fetchAccessToken()
  })
  return <div>KaKaoRedirectPage - 인가코드: ${authCode}</div>
}

export default KaKaoRedirectPage
