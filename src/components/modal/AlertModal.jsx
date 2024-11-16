import useModalStore from '@/store/modalStore'
import React from 'react'
import styled from 'styled-components'
import Button from '../common/Button'
function AlertModal({ message }) {
  const { closeModal } = useModalStore()
  return (
    <Wrap>
      <Text>{message}</Text>
      <Button text='확인' onClick={closeModal} ispadding={true}></Button>
    </Wrap>
  )
}

export default AlertModal
const Wrap = styled.div``
const Text = styled.div`
  color: var(--color-gray-200);
  line-height: 30px;
  font-size: 20px;
  font-weight: 200;
  margin-bottom: 10px;
`
