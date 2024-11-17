import media from '@/styles/media'
import React from 'react'
import styled from 'styled-components'
import arrow from '@/assets/icons/arrow-right.svg'
function OverlayPosterCard({ movieTitle, movieTagLine, movieYear }) {
  return (
    <div>
      <OverlayPosterCardContainer>
        <OverlayPosterCardWrapper>
          <OverlayPosterCardTopWrapper>
            <OverlayPosterCardTitle>{`${movieTitle}`}</OverlayPosterCardTitle>
            <OverlayPosterCardDate>{`(${movieYear})`}</OverlayPosterCardDate>
          </OverlayPosterCardTopWrapper>
          <OverlayPosterCardContent>{`${movieTagLine}`}</OverlayPosterCardContent>
          <OverlayPosterCardArrow src={arrow} />
        </OverlayPosterCardWrapper>
      </OverlayPosterCardContainer>
    </div>
  )
}

const OverlayPosterCardContainer = styled.div`
  box-sizing: content-box;
  position: fixed;
  top: 0;
  left: 0;
  width: 165px;
  height: 230px;
  background: rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 19px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  opacity: 0;
  ${media.small`
    width:114px;
    height:161px;
    padding-top:5px;
    padding-bottom:5px;
    padding-left:2px;
    padding-right:2px;
    `}
  &:hover {
    opacity: 1;
    transition: 0.3s ease;
  }
`
const OverlayPosterCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`

const OverlayPosterCardTopWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 64px;
  width: 115px;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 40px;
  gap: 7px;
  ${media.small`
    top:12px
  `}
`

const OverlayPosterCardTitle = styled.div`
  width: 115px;
  height: fit-content;
  color: var(--color-gray-50);
  font-size: 18px;
  line-height: 18px;
  font-weight: 500;
  text-align: center;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  overflow: hidden;
  ${media.small`
  width:100px;
    font-size : 14px;
  -webkit-line-clamp: 1;
  `}
`
const OverlayPosterCardDate = styled.div`
  width: 64px;
  height: 18px;
  color: var(--color-gray-50);
  font-size: 16px;
  line-height: 18px;
  font-weight: 500;
  text-align: center;
  /* position: fixed; */
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  ${media.small`
    font-size : 14px
  `}
`

const OverlayPosterCardContent = styled.div`
  width: 125px;
  height: fit-content;
  color: var(--color-gray-50);
  font-size: 15px;
  line-height: 18px;
  font-weight: 200;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  overflow: hidden;
  padding-top: 20px;
  ${media.small`
    font-size:10px;
    width:65px;
    line-height:14px;
    display:-webkit-box;
    -webkit-line-clamp: 2;
    text-overflow:ellipsis;
    -webkit-box-orient: vertical;
  overflow: hidden;
  padding-top:15px;
  `};
`
const OverlayPosterCardArrow = styled.img`
  position: fixed;
  bottom: 30px;
  width: 36px;
  height: 36px;
  ${media.small`
    width:18px
    height:18px
  `}
`

export default OverlayPosterCard
