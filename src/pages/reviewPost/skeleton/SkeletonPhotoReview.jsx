import React from 'react'
import styled from 'styled-components'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { useWindowSize } from '@/utils/useWindowSize'

function SkeletonPhotoReview() {
  const { width } = useWindowSize()
  const isMobile = width <= 752
  return (
    <SkeletonTheme baseColor='rgba(255, 255, 255, 0.1)' highlightColor='rgba(255, 255, 255, 0.15)'>
      <Container>
        <Wrap>
          <SkeletonBox width='100px' height='100px' />
          <SkeletonBox width='100px' height='100px' />
          <SkeletonBox width='100px' height='100px' />
          <SkeletonBox width='100px' height='100px' />
          {!isMobile && (
            <>
              <SkeletonBox width='100px' height='100px' />
            </>
          )}
        </Wrap>
      </Container>
    </SkeletonTheme>
  )
}
export default SkeletonPhotoReview

// Styled Skeleton Components
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  width: 100%;
  gap: 50px;
  /* background: red; */
  @media (max-width: 752px) {
    flex-direction: column;
  }
`
const SkeletonBox = styled(Skeleton)`
  aspect-ratio: ${(props) => props.aspectRatio || 'auto'};
  border-radius: ${(props) => props.borderRadius || '5px'};
`
const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 20px;
  @media (max-width: 752px) {
    flex-direction: row;
  }
`
