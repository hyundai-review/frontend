import media from '@/styles/media'
import React, { useState } from 'react'
import styled from 'styled-components'
import homeIcon from '@/assets/icons/navHomeIcon.svg'
import searchIcon from '@/assets/icons/navSearchIcon.svg'
import myIcon from '@/assets/icons/navMyIcon.svg'
import loginIcon from '@/assets/icons/navLoginIcon.svg'
import { useNavigate } from 'react-router-dom'

function MobileNavigationBar() {
  const navigate = useNavigate()
  const [selectedItem, setSelectedItem] = useState(0)
  //TODO(j) 로그인상태 store로 저장하면 이 변수 대체
  const isLogin = true
  const logInMenuItems = [
    { icon: `${homeIcon}`, name: '홈', url: '/' },
    { icon: `${searchIcon}`, name: '검색', url: '/search' },
    { icon: `${myIcon}`, name: '마이', url: '/mypage' },
  ]
  const logOutMenuItems = [
    { icon: `${homeIcon}`, name: '홈', url: '/' },
    { icon: `${searchIcon}`, name: '검색', url: '/search' },
    //TODO(j) 로그인 페이지 만들면 연결하기
    { icon: `${loginIcon}`, name: '로그인', url: '/mypage' },
  ]
  const handleClick = (url, index) => {
    navigate(`${url}`)
    setSelectedItem(index)
  }
  return (
    <div>
      <MobileNavigationBarContainer>
        {isLogin === true
          ? logInMenuItems.map((item, index) => (
              <MobileNavigationBarItemWrapper
                onClick={() => {
                  handleClick(item.url, index)
                }}
                $isSelected={selectedItem === index ? true : false}
                key={index}
              >
                <img src={`${item.icon}`} />
                {item.name}
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
                {item.name}
              </MobileNavigationBarItemWrapper>
            ))}
      </MobileNavigationBarContainer>
    </div>
  )
}

const MobileNavigationBarContainer = styled.div`
  //이후 outlet연결시 제거
  position: fixed;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  //여기까지
  height: 30px;
  z-index: 100;
  border-radius: 10px;
  margin: 0 auto;
  /* background: rgba(0, 0, 0, 0.25); */
  /* backdrop-filter: blur(10px); */
  background: gray;
  display: none;
  justify-content: space-between;
  ${media.small`
    display:flex
  `}
`
const MobileNavigationBarItemWrapper = styled.div`
  width: 80px;
  color: var(--color-gray-200);
  /* line-height: 30px; */
  font-size: 13px;
  margin-top: 2px;
  margin-bottom: 2px;
  font-weight: 200;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-color: ${(props) => (props.$isSelected === true ? 'black' : 'transparent')};
`

export default MobileNavigationBar
