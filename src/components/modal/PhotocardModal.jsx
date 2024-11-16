import React, { useEffect } from 'react'
import styled from 'styled-components'
import close from '@/assets/icons/close.svg'
import useModalStore from '@/store/modalStore'
function PhotocardModal({ photocard }) {
  const { closeModal } = useModalStore()
  return (
    <div>
      <CloseButton src={close} onClick={closeModal} />
      <PhotocardImage src={photocard.image} alt={photocard.name} />
    </div>
  )
}
const CloseButton = styled.img`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 24px;
  height: 24px;
  cursor: pointer;
`
export default PhotocardModal
const PhotocardImage = styled.img`
  margin-top: 20px;
  width: 100%;
  height: auto;
  border-radius: 8px;
`
