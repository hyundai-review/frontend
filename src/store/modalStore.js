import { create } from 'zustand'
// openModal로 포토카드 정보를 받아 상태를 업데이트하고, closeModal로 모달을 닫습니다
const useModalStore = create((set) => ({
  isOpen: false,
  selectedPhotocard: null,
  openModal: (photocard) => set({ isOpen: true, selectedPhotocard: photocard }),
  closeModal: () => set({ isOpen: false, selectedPhotocard: null }),
}))

export default useModalStore
