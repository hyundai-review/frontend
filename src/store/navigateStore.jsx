import { create } from 'zustand'

const useNavigateStore = create((set) => ({
  nowPage: 0,
  setNowPage: (page) =>
    set(() => ({
      nowPage: page,
    })),
}))

export default useNavigateStore
