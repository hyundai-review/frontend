import React from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import styled from 'styled-components'
import 'react-loading-skeleton/dist/skeleton.css'

function SkeletonMoviePosterCard() {
  return (
    <SkeletonTheme baseColor='rgba(255, 255, 255, 0.1)' highlightColor='rgba(255, 255, 255, 0.15)'>
      <SkeletonBox height='270px' width='205px' />
    </SkeletonTheme>
  )
}

const SkeletonBox = styled(Skeleton)`
  aspect-ratio: ${(props) => props.aspectRatio || 'auto'};
  border-radius: ${(props) => props.borderRadius || '5px'};
`

export default SkeletonMoviePosterCard
