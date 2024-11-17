import Button from '@/components/common/Button'
import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import edit from '@/assets/icons/edit.svg'
import useAuthStore from '@/store/authStore'
import { useNavigate } from 'react-router-dom'
import { authenticated } from '@/libs/axiosInstance'
import { getUserData } from '@/utils/logInManager'
import { isLoggedIn } from '@/utils/logInManager'
import { useApi } from '@/libs/useApi'
// import { getUserData } from '@/utils/getUserData'

function Profile() {
  const [userinfo, setUserInfo] = useState(getUserData())
  const userNicknameLength = userinfo.nickname.length
  const inputRef = useRef(null)
  const navigate = useNavigate()
  const reviewCount = 32
  const [isEdit, setIsEdit] = useState(true)
  const { logout, setuserNickname } = useAuthStore()


function Profile() {
  const navigate = useNavigate()
  //-------------------------------Data---------------------------
  const userData = getUserData()
  const reviewCount = 32 // TODO(k) 응답 배열 개수 세야할듯 > util로 뺴야할지도?
  //TODO(j) axios 요청 따로 모으기 + 로그아웃 로직 분리
  // ------------------------------login---------------------------
  const { isLoggedIn } = useAuthStore()
  const handleEditNickname = async () => {
    setIsEdit(!isEdit)
    if (userinfo.nickname !== inputRef.current.value) {
      try {
        //TODO(j) axios 요청 따로 모으기 + 로그아웃 로직 분리
        const ans = await authenticated.put('/members/nickname', {
          nickname: `${inputRef.current.value}`,
        })
        setuserNickname(ans.data)
      } catch (e) {
        console.log('닉네임 수정 실패')
      }
      setUserInfo(getUserData())
      window.location.reload()
    }
  }
  const handleLogout = async () => {
    try {
      await authenticated.post('/auth/logout')
      logout()
      navigate('/')
    } catch (e) {
      console.log(e)
    }
  }
  //TODO(j) input에 자동포커스 가게하기
  // ------------------------------API---------------------------
  const isLogin = true // 임시
  const { get, loading, error } = useApi(false) // 테스트중 true로 바꿔야함
  const [data, setData] = useState(null)
  useEffect(() => {
    // TODO(k) 틀만 잡아둠 완성 아직
    if (!isLogin) return // 로그인 상태가 아니면 추가 요청 생략
    const fetchMypageData = async () => {
      try {
        const data = await get(`/reviews/my`)
        setData(data)
        console.log(data)
      } catch (err) {
        console.error('마이페이지 정보를 가져오는 중 오류가 발생했습니다:', err)
      }
    }
    fetchMypageData()
  }, [])
  return (
    <ProfileContainer>
      <ProfileImage src={`${userinfo.profile}`} />
      {isEdit === true ? (
        <ProfileNicknameWrap>
          <ProfileNickname>{`${userinfo.nickname}`}</ProfileNickname>
          <ProfileSuffix>님</ProfileSuffix>
          <Icon onClick={() => setIsEdit(!isEdit)} src={edit} alt='아이콘' />
        </ProfileNicknameWrap>
      ) : (
        <ProfileNicknameWrap>
          <form onSubmit={handleEditNickname}>
            <ProfileNicknameInput
              defaultValue={`${userinfo.nickname}`}
              length={userNicknameLength}
              ref={inputRef}
            ></ProfileNicknameInput>
            <Icon onClick={() => handleEditNickname()} src={edit} alt='아이콘' />
          </form>
        </ProfileNicknameWrap>
      )}
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
  width: fit-content;
`
const ProfileNickname = styled.span`
  color: #fafafa;
  font-size: 24px;
  font-weight: 700;
  line-height: 36px;
`
const ProfileNicknameInput = styled.input`
  width: ${(props) => props.length * 24 + 30}px;
  min-width: 100px;
  outline: none;
  border: none;
  background: transparent;
  color: #fafafa;
  font-size: 24px;
  font-weight: 700;
  line-height: 36px;
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(10px);
  box-shadow: 0 0 15px 5px rgba(255, 255, 255, 0.3);
  border-radius: 10px;
  padding: 0px 10px;
  margin-right: 10px;
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
