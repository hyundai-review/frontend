import useModalStore from '@/store/modalStore'
import React from 'react'
import styled from 'styled-components'
import Button from '../common/Button'
function ConfirmModal({ message }) {
  const { confirmModal, closeModal } = useModalStore()
  return (
    <Wrap>
      <Text>{message}</Text>
      <ButtonWrap>
        <Button text='확인' onClick={confirmModal} ispadding={true}></Button>
        <Button text='취소' onClick={closeModal} ispadding={true}></Button>
      </ButtonWrap>
    </Wrap>
  )
}

export default ConfirmModal
const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
`
const Text = styled.div`
  color: var(--color-gray-200);
  line-height: 30px;
  font-size: 20px;
  font-weight: 200;
  margin-bottom: 10px;
`
const ButtonWrap = styled.div`
  display: flex;
  gap: 10px;
`
