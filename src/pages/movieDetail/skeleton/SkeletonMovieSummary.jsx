import React from 'react'
import styled from 'styled-components'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

function SkeletonMovieSummary() {
  return (
    <SkeletonTheme baseColor='rgba(255, 255, 255, 0.1)' highlightColor='rgba(255, 255, 255, 0.15)'>
      <SkeletonContainer>
        <LeftSection>
          <SkeletonBox height='100%' width='130px' aspectRatio='94 / 141' />
        </LeftSection>
        <RightSection>
          <Right>
            <SkeletonBox width='150px' height='30px' />
            <Between>
              <SkeletonBox width='100px' height='20px' />
              <SkeletonBox width='100px' height='20px' />
            </Between>
            <SkeletonBox width='130px' height='30px' />
            <Flexend>
              <SkeletonBox width='100px' height='20px' />
            </Flexend>
          </Right>
        </RightSection>
      </SkeletonContainer>
    </SkeletonTheme>
  )
}

export default SkeletonMovieSummary

// Styled Skeleton Components
const SkeletonContainer = styled.div`
  display: flex;
  width: 100%;
  gap: 10px;
  padding: 10px;
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.25);
  border: 1px solid rgba(255, 255, 255, 0.1);
`

const LeftSection = styled.div`
  width: auto;
  display: flex;
`

const RightSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`

const Right = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: space-around;
  gap: 15px;
`
const Between = styled.div`
  display: flex;
  justify-content: space-between;
`
const Flexend = styled.div`
  display: flex;
  justify-content: flex-end;
`

const SkeletonBox = styled(Skeleton)`
  aspect-ratio: ${(props) => props.aspectRatio || 'auto'};
  border-radius: ${(props) => props.borderRadius || '5px'};
`
