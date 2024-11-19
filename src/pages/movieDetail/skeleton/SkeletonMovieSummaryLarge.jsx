import React, { useRef, useState, useEffect } from 'react'
import styled from 'styled-components'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

function SkeletonMovieSummaryLarge() {
  return (
    <SkeletonTheme baseColor='rgba(255, 255, 255, 0.1)' highlightColor='rgba(255, 255, 255, 0.15)'>
      <SkeletonContainer>
        <SkeletonBox height='100%' width='160px' aspectRatio='94 / 141' />
        <Container>
          <Title>
            <SkeletonBox width='40%' height='30px' />
          </Title>
          <SkeletonBox width='100%' height='250px' />
        </Container>
      </SkeletonContainer>
    </SkeletonTheme>
  )
}

export default SkeletonMovieSummaryLarge

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
const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  height: 250px;
  overflow: hidden;
`
const Title = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`
const Wrap = styled.div`
  overflow: hidden;
  display: flex;
  width: 100%;
  height: 100%;
  gap: 10px;
`
const SkeletonBox = styled(Skeleton)`
  aspect-ratio: ${(props) => props.aspectRatio || 'auto'};
  border-radius: ${(props) => props.borderRadius || '5px'};
`
