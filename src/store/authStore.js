import { create } from 'zustand'

const useAuthStore = create((set) => ({
  // isLoggedIn: !!localStorage.getItem('authToken'),
  isLoggedIn: false,
  token: localStorage.getItem('authToken') || '',
  login: (token) => {
    set({ isLoggedIn: true, token })
    localStorage.setItem('authToken', token)
  },
  logout: () => {
    set({ isLoggedIn: false, token: '' })
    localStorage.removeItem('authToken')
  },
}))
export default useAuthStore
