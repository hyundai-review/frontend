import { create } from 'zustand'
// openModal로 포토카드 정보를 받아 상태를 업데이트하고, closeModal로 모달을 닫습니다
const useModalStore = create((set) => ({
  isOpen: false,
  modalType: null, // 현재 열려 있는 모달 타입 (alert, photoCard, confirm ...)
  modalProps: {}, // 모달에 전달할 추가 데이터
  selectedPhotocard: null,
  // openModal: (type, props = {}) => set({ isOpen: true, modalType: type, modalProps: props }),
  // closeModal: () => set({ isOpen: false, modalType: null, modalProps: {} }),
  confirmCallback: null, // 확인 버튼 클릭 시 실행될 콜백 함수
  openModal: (type, props = {}, confirmCallback = null) =>
    set({ isOpen: true, modalType: type, modalProps: props, confirmCallback }),
  closeModal: () => set({ isOpen: false, modalType: null, modalProps: {}, confirmCallback: null }),
  confirmModal: () => {
    set((state) => {
      if (state.confirmCallback) {
        state.confirmCallback() // 확인 버튼 클릭 시 콜백 함수 실행
      }
      return { isOpen: false, modalType: null, modalProps: {}, confirmCallback: null }
    })
  },
}))
export default useModalStore

/* 사용예제
const { openModal } = useModalStore()

const handleSlideClick = (item) => {
  // 모달타입 alert > 확인 버튼 하나만 존재
  openModal('alert', {
      message: '리뷰가 등록되었습니다.',
    })
  // 모달타입 photoCard > 닫기 버튼만 존재
  openModal('photoCard', {
    photocard: {
      image: item.photocard,
      name: item.movieTitle,
    },
  })
  // 모달타입 confirm > 확인, 취소 버튼 존재
  openModal(
      'confirm',
      { message: '정말 삭제하시겠습니까?' },
      () => {
      // 확인 버튼 클릭 시 실행될 콜백 함수
        console.log('삭제 작업 진행 중...');
      }
    );
}
*/
