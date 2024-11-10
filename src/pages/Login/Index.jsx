import { GET_KakaoLoginLink } from '@/apis/loginApi'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

function LoginPage() {
  //   const navigate = useNavigate()
  const link = GET_KakaoLoginLink()
  return (
    <div>
      LoginPage
      {/* <button onClick={() => navigate('/user/kakao')}>kakao로그인</button> */}
      <Link to={link}>kakao로그인</Link>
    </div>
  )
}

export default LoginPage
