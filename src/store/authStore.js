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
}))
export default useAuthStore
