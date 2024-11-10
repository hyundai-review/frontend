import Stories from '@/components/story/Stories'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

function MainPage() {
  const navigate = useNavigate()
  return (
    <div>
      MainPage
      <Wrap>
        <Stories />
      </Wrap>
    </div>
  )
}

export default MainPage

const Wrap = styled.div`
  display: flex;
  justify-content: center;
`
