import { GET_KakaoLoginLink } from '@/apis/loginApi'
import React from 'react'
import { Link } from 'react-router-dom'

function LoginPage() {
  const link = GET_KakaoLoginLink()
  return (
    <div>
      LoginPage
      <Link to={link}>kakao로그인</Link>
    </div>
  )
}

export default LoginPage
