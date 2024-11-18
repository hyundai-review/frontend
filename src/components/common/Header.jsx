import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Button from './Button'
import Logo from '/squareLogo.svg'
import { useLocation, useNavigate } from 'react-router-dom'
import media from '@/styles/media'
import { isLoggedIn, getUserData } from '@/utils/logInManager'
import useNavigateStore from '@/store/navigateStore'

function Header() {
  //TODO(j) 로컬 스토리지로 불러오는 값 훅으로 빼기
  const navigate = useNavigate()
  const [isLogIn, setIsLogIn] = useState(isLoggedIn())
  const [data, setData] = useState(getUserData())
  const nameChanged = useNavigateStore((state) => state.nameChanged)
  const location = useLocation()
  useEffect(() => {
    setIsLogIn(isLoggedIn())
    setData(getUserData())
  }, [location.pathname, nameChanged])
  return (
    <div>
      <HeaderContainer>
        <HeaderWrapper>
          <HeaderLogoWrapper>
            <HeaderLogo
              alt='logo'
              src={Logo}
              onClick={() => {
                window.location.href = '/'
              }}
            />
          </HeaderLogoWrapper>
          {!isLogIn ? (
            <HeaderRightWrapper>
              <Button text={'로그인'} onClick={() => navigate('/user/login')} />
            </HeaderRightWrapper>
          ) : (
            <HeaderRightWrapper onClick={() => navigate('/mypage')}>
              <HeaderUserProfileImage src={`${data.profile}`} alt='profileImage' />
              <HeaderUserName>{`${data.nickname}`}</HeaderUserName>
            </HeaderRightWrapper>
          )}
        </HeaderWrapper>
      </HeaderContainer>
    </div>
  )
}

const HeaderContainer = styled.div`
  width: 100%;
  position: fixed;
  box-sizing: border-box;
  top: 0;
  height: 60px;
  z-index: 10;
  background: rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(10px);
  display: flex;
  justify-content: center;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  margin: 0 auto;
  ${media.small`
    display:none;
  `}
`

const HeaderWrapper = styled.div`
  max-width: 1440px;
  width: 100%;
  padding-left: 20px;
  padding-right: 20px;
  display: flex;
  justify-content: space-between;
`

const HeaderLogoWrapper = styled.div`
  width: fit-content;
  height: 100%;
  cursor: pointer;
  display: flex;
  align-items: center;
`

const HeaderLogo = styled.img`
  width: 36px;
  height: 36px;
  ${media.small`
    display:none;
  `}
`

const HeaderRightWrapper = styled.div`
  width: fit-content;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 10px;
  cursor: pointer;
`
const HeaderUserProfileImage = styled.img`
  border-radius: 50%;
  width: 32px;
  height: 32px;
  background: linear-gradient(0deg, #d9d9d9 0%, #d9d9d9 100%);
`

const HeaderUserName = styled.p`
  color: white;
  font-size: 16px;
  line-height: 24px;
`

export default Header
