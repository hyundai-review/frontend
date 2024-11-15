import Button from '@/components/common/Button'
import React from 'react'
import styled from 'styled-components'
import edit from '@/assets/icons/edit.svg'
import useAuthStore from '@/store/authStore'
import { useNavigate } from 'react-router-dom'

function Profile() {
  //temp data
  const userData = JSON.parse(localStorage.getItem('userInfo'))
  const navigate = useNavigate()
  const reviewCount = 32
  const { logout } = useAuthStore()
  // 닉네임 수정 함수
  const handleEditNickname = () => {
    console.log('닉네임 수정 아이콘이 클릭되었습니다.')
    // 닉네임 수정 로직 추가
  }
  const handleLogout = () => {
    logout()
    navigate('/')
  }
  return (
    <ProfileContainer>
      <ProfileImage src={`${userData.profile}`} />
      <ProfileNicknameWrap>
        <ProfileNickname>{`${userData.nickname}`}</ProfileNickname>
        <ProfileSuffix>님</ProfileSuffix>
        <Icon onClick={() => handleEditNickname} src={edit} alt='아이콘' />
      </ProfileNicknameWrap>
      <Button text='로그아웃' onClick={() => handleLogout()} />
    </ProfileContainer>
  )
}

export default Profile

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 131px;
`
const ProfileImage = styled.img`
  width: 128px;
  height: 128px;
  object-fit: cover;
  background: linear-gradient(0deg, #d9d9d9 0%, #d9d9d9 100%);
  box-shadow: 0px 0px 10px rgba(199, 125, 181, 0.5);
  border-radius: 50%;
  margin-bottom: 20px;
`
const ProfileNicknameWrap = styled.div`
  margin-bottom: 10px;
`
const ProfileNickname = styled.span`
  color: #fafafa;
  font-size: 24px;
  font-weight: 700;
  line-height: 36px;
`
const ProfileSuffix = styled.span`
  font-size: 24px;
  font-weight: 200;
  color: #fafafa;
  line-height: 36px;
  margin-right: 10px;
`

const Icon = styled.img`
  cursor: pointer;
  margin-top: 3px;
  width: 24px;
  height: 24px;
`
