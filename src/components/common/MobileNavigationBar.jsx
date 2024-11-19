import media from '@/styles/media'
import React, { useEffect, useState } from 'react'
import styled, { css } from 'styled-components'
import homeIcon from '@/assets/icons/navHomeIcon.svg'
import searchIcon from '@/assets/icons/navSearchIcon.svg'
import myIcon from '@/assets/icons/navMyIcon.svg'
import loginIcon from '@/assets/icons/navLoginIcon.svg'
import { useLocation, useNavigate } from 'react-router-dom'
import useNavigateStore from '@/store/navigateStore'
import { isLoggedIn } from '@/utils/logInManager'

function MobileNavigationBar() {
  const navigate = useNavigate()
  const setNavigatePage = useNavigateStore((state) => state.setNowPage)
  const nowPage = useNavigateStore((state) => state.nowPage)
  const [selectedItem, setSelectedItem] = useState(nowPage)
  const [isLogIn, setisLogIn] = useState(isLoggedIn())
  const location = useLocation()
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
    setSelectedItem(index)
    setNavigatePage(index)
    navigate(`${url}`)
  }
  useEffect(() => {
    setSelectedItem(nowPage)
    setisLogIn(isLoggedIn())
  }, [nowPage])
  //TODO(j) 코드 수정하기
  useEffect(() => {
    if (location.pathname === '/') {
      setNavigatePage(0)
    } else if (location.pathname === '/search') {
      setNavigatePage(1)
    } else if (location.pathname === '/mypage') {
      setNavigatePage(2)
    } else {
      setNavigatePage(-1)
    }
  }, [location, setNavigatePage])
  return (
    <div>
      <MobileNavigationBarContainer>
        <SelectedButtonSlider $index={selectedItem} />
        {isLogIn
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
  position: fixed;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  height: 40px;
  z-index: 100;
  border-radius: 10px;
  margin: 0 auto;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
  display: none;
  justify-content: space-between;
  ${media.small`
    display:flex
  `}
`
const MobileNavigationBarItemWrapper = styled.div`
  width: 100px;
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
  left: ${(props) => props.$index * 100}px;
  width: 100px;
  height: 40px;
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(10px);
  box-shadow: 0 0 15px 5px rgba(255, 255, 255, 0.3);
  border-radius: 10px;
  transition: left 0.3s ease;
  display: ${(props) => (props.$index === -1 ? 'none' : 'flex')};
`

export default MobileNavigationBar
