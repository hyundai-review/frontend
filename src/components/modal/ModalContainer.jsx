import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import * as S from '@/styles/modal.style'
import useModalStore from '@/store/modalStore'
import PhotocardModal from './PhotocardModal'
import AlertModal from './AlertModal'
import ConfirmModal from './ConfirmModal'

const MODAL_COMPONENTS = {
  photoCard: PhotocardModal,
  alert: AlertModal,
  confirm: ConfirmModal,
}
function ModalContainer() {
  const { isOpen, modalType, modalProps, closeModal } = useModalStore()
  // 모달 열림 시 스크롤 비활성화
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = '' // 컴포넌트 언마운트 시 복구
    }
  }, [isOpen])

  if (!isOpen || !modalType) return null
  // 선택된 모달 컴포넌트 가져오기
  const SelectedModal = MODAL_COMPONENTS[modalType]

  //   useEffect(() => {
  //     console.log('modal >>> ', selectedPhotocard)
  //   }, [])

  return ReactDOM.createPortal(
    <S.ModalBackground onClick={closeModal}>
      <S.ModalContent onClick={(e) => e.stopPropagation()}>
        {/* <S.CloseButton src={close} onClick={closeModal} /> */}
        {SelectedModal ? <SelectedModal {...modalProps} /> : null}
      </S.ModalContent>
    </S.ModalBackground>,
    document.getElementById('modal-root'),
  )
}

export default ModalContainer
