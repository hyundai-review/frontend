const DEFAULT_PROFILE = 'https://i.pinimg.com/736x/12/fa/c4/12fac4dcdd86bad5175de91cb2dca688.jpg'
// const DEFAULT_PROFILE = '/logo.svg'
const DEFAULT_NICKNAME = '아보카도파김치'
const INVALID_PROFILES = [
  'http://img1.kakaocdn.net/thumb/R640x640.q70/?fname=http://t1.kakaocdn.net/account_images/default_profile.jpeg',
]

export function getUserData() {
  const storedData = JSON.parse(localStorage.getItem('userInfo')) || {
    profile: DEFAULT_PROFILE,
    nickname: DEFAULT_NICKNAME,
  }

  if (INVALID_PROFILES.includes(storedData.profile)) {
    storedData.profile = DEFAULT_PROFILE
  }

  return storedData
}
