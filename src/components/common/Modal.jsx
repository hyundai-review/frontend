import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import * as S from '@/styles/modal.style'
import useModalStore from '@/store/modalStore'
import close from '@/assets/icons/close.svg'

function Modal() {
  const { isOpen, selectedPhotocard, closeModal } = useModalStore()

  if (!isOpen || !selectedPhotocard) return null
  //   useEffect(() => {
  //     console.log('modal >>> ', selectedPhotocard)
  //   }, [])

  return ReactDOM.createPortal(
    <S.ModalBackground onClick={closeModal}>
      <S.ModalContent onClick={(e) => e.stopPropagation()}>
        <S.CloseButton src={close} onClick={closeModal} />
        <S.PhotocardImage src={selectedPhotocard.photocard} alt={selectedPhotocard.name} />
      </S.ModalContent>
    </S.ModalBackground>,
    document.getElementById('modal-root'),
  )
}

export default Modal
