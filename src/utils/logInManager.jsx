// 임시로 사용자 정보를 저장하는 파일입니다.
const DEFAULT_PROFILE = 'https://i.pinimg.com/736x/5d/cb/f9/5dcbf9d35dd6fe3b6ba8b219f824d1b8.jpg'
// const DEFAULT_PROFILE = '/logo.svg'
const DEFAULT_NICKNAME = 'DEFAULT_NICKNAME'
const INVALID_PROFILES = [
  'http://img1.kakaocdn.net/thumb/R640x640.q70/?fname=http://t1.kakaocdn.net/account_images/default_profile.jpeg',
]
import { getCookie, removeCookie, setCookie } from './cookie'

//로컬 스토리지에 저장된 사용자 정보, 로그인 상태를 null값과 체크, 비교하여 전달
//TODO(j) 코드 좀 더 아름답게 만들기
export const getUserData = () => {
  const checkLogIn = getCookie('isLogIn')
  if (checkLogIn == true) {
    const userInfo = getCookie('userInfo')
    const value = JSON.parse(userInfo)
    return value
  } else {
    return { memberId: ' ', nickname: DEFAULT_NICKNAME, profile: DEFAULT_PROFILE }
  }
}
export const testisLoggedIn = true

export const isLoggedIn = () => {
  // const checkLogIn = getCookie('isLogIn')
  // if (checkLogIn === null) {
  //   return false
  // } else if (checkLogIn === true) {
  //   return true
  // } else {
  //   return false
  // }
  return true
}

export const removeData = () => {
  removeCookie('userInfo')
  removeCookie('isLogIn')
  removeCookie('ACCESS_TOKEN')
}

export const setUserNickname = (newData) => {
  const nowUserData = JSON.parse(getCookie('userInfo'))
  setCookie(
    'userInfo',
    JSON.stringify({
      memberId: nowUserData.memberId,
      nickname: newData.nickname,
      profile: nowUserData.profile,
    }),
    7,
  )
}
