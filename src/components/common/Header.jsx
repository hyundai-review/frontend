import React from 'react'
import styled from 'styled-components'
import Button from './Button'
import Logo from '/logo.svg'
import { useNavigate } from 'react-router-dom'
import media from '@/styles/media'
import useAuthStore from '@/store/authStore'
//TODO(j)button onClick시 로그인 로직 작동
function Header() {
  //TODO(j) 로그인 유저 정보 저장시 이 변수들 바꾸기
  const navigate = useNavigate()
  const { isLoggedIn } = useAuthStore()
  const profileImage = 'https://image.tmdb.org/t/p/w300/tKV0etz5OIsAjSNG1hJktsjbNJk.jpg'
  const userName = '테스트'
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
          {!isLoggedIn ? (
            <HeaderRightWrapper>
              <Button text={'로그인'} />
              {/* <Button text={'로그인'} onClick={console.log('여기에 로그인')} /> */}
            </HeaderRightWrapper>
          ) : (
            <HeaderRightWrapper onClick={() => navigate('/mypage')}>
              <HeaderUserProfileImage src={`${profileImage}`} alt='profileImage' />
              <HeaderUserName>{`${userName}`}</HeaderUserName>
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
`

const HeaderUserName = styled.p`
  color: white;
  font-size: 16px;
  line-height: 24px;
`

export default Header
