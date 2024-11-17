import { removeCookie } from '@/utils/cookie'
import { create } from 'zustand'

const useAuthStore = create((set) => ({
  isLoggedIn: false,
  token: localStorage.getItem('authToken') || '',
  login: (userData) => {
    set({ isLoggedIn: true })
    localStorage.setItem('userInfo', JSON.stringify(userData))
    localStorage.setItem('isLogIn', true)
  },
  logout: () => {
    set({ isLoggedIn: false })
    localStorage.removeItem('userInfo')
    localStorage.removeItem('isLogIn')
    removeCookie('ACCESS_TOKEN')
  },
  setuserNickname: (newData) => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    const newUserId = userInfo.memberId
    const newUsernickname = newData.nickname || userInfo.nickname
    const newUserProfile = userInfo.profile
    const newUserInfo = {
      memberId: newUserId,
      nickname: newUsernickname,
      profile: newUserProfile,
    }
    localStorage.setItem('userInfo', JSON.stringify(newUserInfo))
  },
}))
export default useAuthStore
