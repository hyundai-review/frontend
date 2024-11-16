import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import * as S from '@/styles/modal.style'
import useModalStore from '@/store/modalStore'
import PhotocardModal from './PhotocardModal'
import AlertModal from './AlertModal'

const MODAL_COMPONENTS = {
  photoCard: PhotocardModal,
  alert: AlertModal,
}
function ModalContainer() {
  const { isOpen, modalType, modalProps, closeModal } = useModalStore()

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
