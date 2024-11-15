import React from 'react'
import media from '@/styles/media'
import styled from 'styled-components'

/*movieInfo에는 imageUrl, rank, date가 들어가야 합니다. */

function BoxOfficePosterCard({ movieInfo }) {
  return (
    <div>
      <BoxOfficePosterCardContainer
        onClick={() => {
          //TODO(j) 영화 디테일페이지로 이동
          console.log(movieInfo.id, '여기에 movie detailpage로 이동')
        }}
        className='hoverBright'
      >
        <BoxOfficePosterCardImageWrapper>
          <BoxOfficePosterCardImage src={`${movieInfo.imageUrl}`} />
        </BoxOfficePosterCardImageWrapper>
        <BoxOfficePosterCardInfoWrapper>
          <BoxOfficePosterCardRank>{`${movieInfo.rank}`}</BoxOfficePosterCardRank>
          <BoxOfficePosterCardDate>{`${movieInfo.date}`}</BoxOfficePosterCardDate>
        </BoxOfficePosterCardInfoWrapper>
      </BoxOfficePosterCardContainer>
    </div>
  )
}

const BoxOfficePosterCardContainer = styled.div`
  width: 200px;
  height: 240px;
  box-sizing: content-box;
  background: rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding-left: 19px;
  padding-top: 19px;
  padding-bottom: 19px;
  padding-right: 10px;
  margin: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  ${media.small`
    width:114px;
    height:161px;
    padding:5px`}
`

const BoxOfficePosterCardImageWrapper = styled.div`
  width: 154px;
  height: 220px;
  ${media.small`
    width: 92px;
    height: 132px
  `}
`

const BoxOfficePosterCardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
`

const BoxOfficePosterCardInfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
  height: 100%;
  padding-left: 12px;
`

const BoxOfficePosterCardRank = styled.div`
  color: white;
  word-wrap: break-word;
  font-weight: 700;
  font-size: 32px;
  font-family: 'Pretendard';
  filter: drop-shadow(0px 0px 10px var(--primary-light-red, #ffd7d7));
  ${media.small`
  `}
`

const BoxOfficePosterCardDate = styled.div`
  display: inline-block;
  writing-mode: vertical-rl;
  color: gray;
`

export default BoxOfficePosterCard
