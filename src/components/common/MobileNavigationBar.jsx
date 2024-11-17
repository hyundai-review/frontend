import media from '@/styles/media'
import React, { useState } from 'react'
import styled, { css } from 'styled-components'
import homeIcon from '@/assets/icons/navHomeIcon.svg'
import searchIcon from '@/assets/icons/navSearchIcon.svg'
import myIcon from '@/assets/icons/navMyIcon.svg'
import loginIcon from '@/assets/icons/navLoginIcon.svg'
import { useNavigate } from 'react-router-dom'
import useAuthStore from '@/store/authStore'

//TODO(j) 다른 버튼 눌러서 이동해도 아래 네비게이션바가 따라오게하기 (store로 저장)
function MobileNavigationBar() {
  const navigate = useNavigate()
  const [selectedItem, setSelectedItem] = useState(0)
  const { isLoggedIn } = useAuthStore()
  const logInMenuItems = [
    { icon: `${homeIcon}`, url: '/' },
    { icon: `${searchIcon}`, url: '/search' },
    { icon: `${myIcon}`, url: '/mypage' },
  ]
  const logOutMenuItems = [
    { icon: `${homeIcon}`, url: '/' },
    { icon: `${searchIcon}`, url: '/search' },
    { icon: `${loginIcon}`, url: '/user/login' },
  ]
  const handleClick = (url, index) => {
    navigate(`${url}`)
    setSelectedItem(index)
  }
  return (
    <div>
      <MobileNavigationBarContainer>
        <SelectedButtonSlider $index={selectedItem} />
        {isLoggedIn
          ? logInMenuItems.map((item, index) => (
              <MobileNavigationBarItemWrapper
                onClick={() => {
                  handleClick(item.url, index)
                }}
                $isSelected={selectedItem === index ? true : false}
                key={index}
              >
                <img src={`${item.icon}`} />
              </MobileNavigationBarItemWrapper>
            ))
          : logOutMenuItems.map((item, index) => (
              <MobileNavigationBarItemWrapper
                onClick={() => {
                  handleClick(item.url, index)
                }}
                $isSelected={selectedItem === index ? true : false}
                key={index}
              >
                <img src={`${item.icon}`} />
              </MobileNavigationBarItemWrapper>
            ))}
      </MobileNavigationBarContainer>
    </div>
  )
}

const MobileNavigationBarContainer = styled.div`
  //TODO(j) 이후 outlet연결시 제거
  position: fixed;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  //여기까지
  height: 30px;
  z-index: 100;
  border-radius: 10px;
  margin: 0 auto;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
  /* background: gray; */
  display: none;
  justify-content: space-between;
  ${media.small`
    display:flex
  `}
`
const MobileNavigationBarItemWrapper = styled.div`
  width: 80px;
  color: var(--color-gray-200);
  font-size: 13px;
  margin-top: 2px;
  margin-bottom: 2px;
  font-weight: 200;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`

const SelectedButtonSlider = styled.div`
  position: fixed;
  left: ${(props) => props.$index * 80}px;
  width: 80px;
  height: 30px;
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(10px);
  box-shadow: 0 0 15px 5px rgba(255, 255, 255, 0.3);
  border-radius: 10px;
  transition: left 0.3s ease;
`

const SelectedStyle = css`
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(10px);
  box-shadow: 0 0 15px 5px rgba(255, 255, 255, 0.3);
  /* animation: slideEffect 0.3 ease; */
`

export default MobileNavigationBar
