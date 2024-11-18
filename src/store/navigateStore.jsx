import { create } from 'zustand'

const useNavigateStore = create((set) => ({
  nowPage: 0,
  nameChanged: false,
  setNowPage: (page) =>
    set(() => ({
      nowPage: page,
    })),
  setNameChanged: () =>
    set((state) => ({
      nameChanged: !state.nameChanged,
    })),
}))

export default useNavigateStore
