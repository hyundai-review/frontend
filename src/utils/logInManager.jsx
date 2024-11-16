//로컬 스토리지에 저장된 사용자 정보, 로그인 상태를 null값과 체크, 비교하여 전달
//TODO(j) 코드 좀 더 아름답게 만들기

export const userData = () => {
  const checkLogIn = localStorage.getItem('isLogIn')
  if (checkLogIn == 'true') {
    const userInfo = localStorage.getItem('userInfo')
    const value = JSON.parse(userInfo)
    return value
  } else {
    return { memberId: ' ', nickname: ' ', profile: ' ' }
  }
}
export const testisLoggedIn = true

export const isLoggedIn = () => {
  // const checkLogIn = localStorage.getItem('isLogIn')
  // if (checkLogIn === null) {
  //   return false
  // } else if (checkLogIn === 'true') {
  //   return true
  // } else {
  //   return false
  // }
  return true
}
