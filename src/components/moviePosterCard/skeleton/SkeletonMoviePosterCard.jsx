import React from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import styled from 'styled-components'
import 'react-loading-skeleton/dist/skeleton.css'
import { useMediaQuery } from '@mui/material'

function SkeletonMoviePosterCard() {
  const isMobile = useMediaQuery('(max-width: 428px)')
  return (
    <SkeletonTheme baseColor='rgba(255, 255, 255, 0.1)' highlightColor='rgba(255, 255, 255, 0.15)'>
      {isMobile == true ? (
        <SkeletonBox height='172px' width='120px' />
      ) : (
        <SkeletonBox height='270px' width='205px' />
      )}
    </SkeletonTheme>
  )
}

const SkeletonBox = styled(Skeleton)`
  aspect-ratio: ${(props) => props.aspectRatio || 'auto'};
  border-radius: ${(props) => props.borderRadius || '5px'};
`

export default SkeletonMoviePosterCard
