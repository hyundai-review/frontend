import { GET_KakaoLoginLink } from '@/apis/loginApi'
import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import logo from '/logo.svg'
import kakao from '@/assets/icons/kakao.svg'

function LoginPage() {
  const link = GET_KakaoLoginLink()
  return (
    <div>
      <LoginPageContainer>
        <LoginPageWrapper>
          <LoginPageLogo alt='logo' src={logo} />
          <LoginPageTitle>{'마이 리틀 프레임에 오신걸 환영해요!'}</LoginPageTitle>
          <LoginPageParagraph>
            {'다른 사용자의 리뷰를 구경하려면?'}
            <br />
            {'영화 추천을 받고 싶다면?'}
          </LoginPageParagraph>
          <KakaoLoginButton>
            <img src={kakao} />
            <p style={{ flex: 1, paddingRight: '25px', fontWeight: '500' }}>{'카카오 로그인'}</p>
            <Link to={link} />
          </KakaoLoginButton>
        </LoginPageWrapper>
      </LoginPageContainer>
    </div>
  )
}

const LoginPageContainer = styled.div`
  width: 574px;
  height: 320px;
  background: rgba(0, 0, 0, 0.25);
  box-shadow: 0px 0px 10px rgba(199, 125, 181, 0.5);
  border-radius: 10px;
  border: 1px, solid, #b6b5ff;
  margin: 0 auto;
  transform: translateY(50%);
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 600px) {
    width: 362px;
    height: 320px;
  }
`

const LoginPageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 20px;
`

const LoginPageLogo = styled.img`
  width: 64px;
  height: 64px;
`

const LoginPageTitle = styled.p`
  color: var(--color-gray-50);
  font-weight: 200;
  font-size: 16px;
  line-height: 24px;
`
const LoginPageParagraph = styled.p`
  color: var(--color-gray-400);
  font-weight: 200;
  font-size: 14px;
  line-height: 21px;
  text-align: center;
`

const KakaoLoginButton = styled.button`
  width: 300px;
  height: 45px;
  border-radius: 12px;
  background-color: #fee500;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 12px;
  padding-right: 12px;
  cursor: pointer;
`

export default LoginPage
