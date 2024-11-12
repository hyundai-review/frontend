import React from 'react'
import styled from 'styled-components'
import Button from './Button'
import Logo from '/logo.svg'
import { useNavigate } from 'react-router-dom'

//button onClick시 로그인 로직 작동
function Header({ isLogin, profileImage, userName }) {
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
          <Button text={'로그인'} onClick={console.log('여기에 로그인')} />
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
  backdrop-filter: 'blur(40px)';
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
`

const HeaderRightWrapper = styled.div`
  width: fit-content;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: row;
`
const HeaderUserProfileImage = styled.img`
  border-radius: 50%;
`

const HeaderUserName = styled.p`
  color: white;
  font-size: 16px;
  line-height: 24px;
`

export default Header
