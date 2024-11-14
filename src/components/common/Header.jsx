import React from 'react'
import styled from 'styled-components'
import Button from './Button'
import Logo from '/logo.svg'
import { useNavigate } from 'react-router-dom'
import media from '@/styles/media'
//TODO(j)button onClick시 로그인 로직 작동
function Header() {
  //TODO(j) 로그인 유저 정보 저장시 이 변수들 바꾸기
  const isLogin = true
  const profileImage = 'https://image.tmdb.org/t/p/w300/tKV0etz5OIsAjSNG1hJktsjbNJk.jpg'
  const useName = '테스트'
  return (
    <div>
      <HeaderContainer>
        <HeaderLogoWrapper>
          <HeaderLogo
            alt='logo'
            src={Logo}
            onClick={() => {
              window.location.href = '/'
            }}
          />
        </HeaderLogoWrapper>
        {isLogin === false ? (
          <HeaderRightWrapper>
            <Button text={'로그인'} onClick={console.log('여기에 로그인')} />
          </HeaderRightWrapper>
        ) : (
          <HeaderRightWrapper onClick={console.log('여기에 마이')}>
            <HeaderUserProfileImage src={`${profileImage}`} alt='profileImage' />
            <HeaderUserName>{`${userName}`}</HeaderUserName>
          </HeaderRightWrapper>
        )}
      </HeaderContainer>
    </div>
  )
}

const HeaderContainer = styled.div`
  width: 100%;
  height: 60px;
  background: rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(10px);
  display: flex;
  justify-content: space-between;
  padding-left: 20px;
  padding-right: 20px;
  ${media.small`
    display:none;
  `}
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
