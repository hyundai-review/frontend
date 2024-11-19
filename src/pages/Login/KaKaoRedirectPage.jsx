import { GET_AccessToken } from '@/apis/loginApi'
import { getCookie, removeCookie, setCookie } from '@/utils/cookie'
import React, { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import MainLayout from '@/components/layout/MainLayout'
import { replace } from 'lodash'
import { BeatLoader } from 'react-spinners'
import styled from 'styled-components'
import { useMediaQuery } from '@mui/material'

const MainPage = lazy(() => import('@/pages/Main/Index'))
function KaKaoRedirectPage() {
  const [searchParams] = useSearchParams()
  const authCode = searchParams.get('code')
  const navigate = useNavigate()
  const isSmallScreen = useMediaQuery('(max-width:428px)')
  useEffect(() => {
    const fetchAccessToken = async () => {
      try {
        removeCookie('ACCESS_TOKEN')
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
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <div
        className='wrapper'
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <p
          style={{
            fontSize: isSmallScreen ? '24px' : '36px',
            color: 'var(--color-gray-50)',
            marginBottom: '30px',
          }}
        >
          {'카카오 로그인 중입니다.'}
        </p>
        <BeatLoader
          color={`var(--color-gray-50)`}
          margin={15}
          size={isSmallScreen ? 50 : 100}
          speedMultiplier={0.5}
        />
      </div>
    </div>
  )
}
export default KaKaoRedirectPage
