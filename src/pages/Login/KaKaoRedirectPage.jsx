import { GET_AccessToken } from '@/apis/loginApi'
import useAuthStore from '@/store/authStore'
import { getCookie, setCookie } from '@/utils/cookie'
import React, { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import MainLayout from '@/components/layout/MainLayout'

const MainPage = lazy(() => import('@/pages/Main/Index'))
function KaKaoRedirectPage() {
  const [searchParams] = useSearchParams()
  const authCode = searchParams.get('code')
  const { login } = useAuthStore()
  const navigate = useNavigate()
  useEffect(() => {
    const fetchAccessToken = async () => {
      try {
        const userData = await GET_AccessToken(authCode)
        setCookie('ACCESS_TOKEN', userData.accessToken, 7)
        login(userData)
        navigate('/')
      } catch (e) {
        console.log(e)
      }
    }
    fetchAccessToken()
  }, [])
  return (
    <div>
      <MainLayout>
        <MainPage />
      </MainLayout>
    </div>
  )
}

export default KaKaoRedirectPage
