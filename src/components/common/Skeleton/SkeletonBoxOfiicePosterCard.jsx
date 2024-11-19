import React from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import styled from 'styled-components'
import 'react-loading-skeleton/dist/skeleton.css'

function SkeletonBoxOfiicePosterCard() {
  return (
    <div>
      <SkeletonTheme
        baseColor='rgba(255, 255, 255, 0.1)'
        highlightColor='rgba(255, 255, 255, 0.15)'
      >
        <SkeletonBox />
      </SkeletonTheme>
    </div>
  )
}

const SkeletonBox = styled(Skeleton)`
  aspect-ratio: ${(props) => props.aspectRatio || 'auto'};
  border-radius: ${(props) => props.borderRadius || '5px'};
  padding-left: 19px;
  padding-right: 10px;
  padding-top: 19px;
  padding-bottom: 19px;
  margin: 20px;
  width: 200px;
  height: 240px;
`

export default SkeletonBoxOfiicePosterCard
