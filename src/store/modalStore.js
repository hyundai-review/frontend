import { create } from 'zustand'
// openModal로 포토카드 정보를 받아 상태를 업데이트하고, closeModal로 모달을 닫습니다
const useModalStore = create((set) => ({
  isOpen: false,
  modalType: null, // 현재 열려 있는 모달 타입
  modalProps: {}, // 모달에 전달할 추가 데이터
  selectedPhotocard: null,
  openModal: (type, props = {}) => set({ isOpen: true, modalType: type, modalProps: props }),
  closeModal: () => set({ isOpen: false, modalType: null, modalProps: {} }),
}))

export default useModalStore
