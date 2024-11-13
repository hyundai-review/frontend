import React from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import PhotoCard from './../story/PhotoCard'
function PhotocardModal() {
  // const { photocard } = useParams()
  const photocard = 'https://image.tmdb.org/t/p/w300/tKV0etz5OIsAjSNG1hJktsjbNJk.jpg'
  return (
    <ModalWrapper>
      <ModalContent>
        <CloseButton onClick={() => window.history.back()}>X</CloseButton>
        <h1>Story Modal</h1>
        <img src={photocard} alt='Story Photocard' />
      </ModalContent>
    </ModalWrapper>
  )
}

export default PhotocardModal
const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5); // 배경 어둡게 처리
  z-index: 9999;
`

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  position: relative;

  img {
    max-width: 100%;
    max-height: 400px;
    object-fit: contain;
  }
`

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: transparent;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #333;

  &:hover {
    color: red;
  }
`
