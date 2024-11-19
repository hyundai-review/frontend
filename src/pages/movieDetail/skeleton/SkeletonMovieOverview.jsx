import React from 'react'
import styled from 'styled-components'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

function SkeletonMovieOverview() {
  return (
    <SkeletonTheme baseColor='rgba(255, 255, 255, 0.1)' highlightColor='rgba(255, 255, 255, 0.15)'>
      <Container>
        <SkeletonBox height='30px' width='10%' />
        <SkeletonContainer>
          <SkeletonBox width='30%' height='20px' />
          <SkeletonBox width='100%' height='20px' />
          <SkeletonBox width='100%' height='20px' />
        </SkeletonContainer>
      </Container>
    </SkeletonTheme>
  )
}

export default SkeletonMovieOverview

// Styled Skeleton Components
const Container = styled.div`
  margin-top: 20px;
`
const SkeletonContainer = styled.div`
  overflow: hidden;
  margin-top: 20px;
  display: flex;
  width: 100%;
  gap: 10px;
  padding: 10px;
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.25);
  border: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;
`

const SkeletonBox = styled(Skeleton)`
  aspect-ratio: ${(props) => props.aspectRatio || 'auto'};
  border-radius: ${(props) => props.borderRadius || '5px'};
`
