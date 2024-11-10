import media from '@/styles/media'
import React from 'react'
import styled from 'styled-components'
import StoryList from './StoryList'
function StoryPage() {
  return (
    <Wrap>
      <BlurOverlay>
        <StoryList />
      </BlurOverlay>
    </Wrap>
  )
}

export default StoryPage

const Wrap = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  background: url('/assets/images/story/story3.png');
  background-size: cover;
  background-position: center;
`

const BlurOverlay = styled.div`
  width: 100%;
  height: 100%;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(20px);
`
