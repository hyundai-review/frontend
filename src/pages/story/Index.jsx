import React from 'react'
import styled from 'styled-components'
import StoryList from './StoryList'
import { reviewData } from '@/assets/data/reviewData'
import { ProgressBar } from '@/components/story/ProgressBar'
import useStoryStore from '@/store/storyStore'

function StoryPage() {
  const focusReview = useStoryStore((state) => state.focusReview)

  return (
    <Wrap image={focusReview.photocard}>
      <BlurOverlay>
        <StoryList />
        {/* <ProgressBar /> */}
      </BlurOverlay>
    </Wrap>
  )
}

export default StoryPage

const Wrap = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  background: ${(props) => `url(${props.image})`};
  background-size: cover;
  background-position: center;
`

const BlurOverlay = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: center;
  width: 100%;
  height: 100%;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(20px);
`
