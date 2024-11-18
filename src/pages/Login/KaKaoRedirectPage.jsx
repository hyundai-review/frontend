import { GET_AccessToken } from '@/apis/loginApi'
import { getCookie, setCookie } from '@/utils/cookie'
import React, { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import MainLayout from '@/components/layout/MainLayout'
import { replace } from 'lodash'

const MainPage = lazy(() => import('@/pages/Main/Index'))
function KaKaoRedirectPage() {
  const [searchParams] = useSearchParams()
  const authCode = searchParams.get('code')
  const navigate = useNavigate()
  useEffect(() => {
    const fetchAccessToken = async () => {
      try {
        const userData = await GET_AccessToken(authCode)
        setCookie('ACCESS_TOKEN', userData.accessToken, 7)
        setCookie('userInfo', JSON.stringify(userData), 7)
        setCookie('isLogIn', true, 7)
        navigate('/')
      } catch (e) {
        console.log(e)
      }
    }
    fetchAccessToken()
  }, [])
  return (
    <div>
      <MainPage />
    </div>
  )
}

export default KaKaoRedirectPage
