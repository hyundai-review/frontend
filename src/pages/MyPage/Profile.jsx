import Button from '@/components/common/Button'
import React from 'react'
import styled from 'styled-components'
import edit from '@/assets/icon/edit.svg'
function Profile() {
  //temp data
  const nickname = '아보카도파김치'
  const reviewCount = 32

  // 닉네임 수정 함수
  const handleEditNickname = () => {
    console.log('닉네임 수정 아이콘이 클릭되었습니다.')
    // 닉네임 수정 로직 추가
  }
  const handleLogout = () => {
    console.log('로그아웃 클릭됨')
  }
  return (
    <ProfileContainer>
      <ProfileImage src='https://i.pinimg.com/564x/4f/82/6b/4f826b4c9b219eb74c55c29d21b0427e.jpg' />
      <ProfileNicknameWrap>
        <ProfileNickname>{nickname}</ProfileNickname>
        <ProfileSuffix>님</ProfileSuffix>
        <Icon onClick={handleEditNickname} src={edit} alt='아이콘' />
      </ProfileNicknameWrap>
      <Button text='로그아웃' onClick={handleLogout} />
    </ProfileContainer>
  )
}

export default Profile

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 71px;
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
