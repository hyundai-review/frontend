import React from 'react'
import calendar from '@/assets/icons/calendar-tick.svg'
import clock from '@/assets/icons/clock.svg'
import GenreButton from '@/components/common/GenreButton'
function MovieSummary() {
  const posterImageUrl =
    'https://img.cgv.co.kr/Movie/Thumbnail/StillCut/000088/88847/88847230819_727.jpg'
  const title = '청설'
  const year = '2024'
  const rating = 'all'
  const releaseDate = '2024.11.09'
  const runningTime = '1시간 50분'
  return (
    <MovieSummaryContainer>
      <LeftSection>
        <Poster imageUrl={posterImageUrl} />
      </LeftSection>
      <RightSection>
        <RightHeader>
          <RightTitleWrap>
            <RightTitle>{title}</RightTitle>
            <RightYear>({year})</RightYear>
          </RightTitleWrap>
          <RightRating>{rating}</RightRating>
        </RightHeader>
        <MovieInfo>
          <InfoWrap>
            <CalendarIcon src={calendar}></CalendarIcon>
            <ReleaseDate>{releaseDate}</ReleaseDate>
          </InfoWrap>
          <InfoWrap>
            <ClockIcon src={clock}></ClockIcon>
            <RunningTime>{runningTime}</RunningTime>
          </InfoWrap>
        </MovieInfo>
        <MovieGenreWrap>
          <GenreButton category='로맨스' />
          <GenreButton category='드라마' />
        </MovieGenreWrap>
      </RightSection>
    </MovieSummaryContainer>
  )
}

export default MovieSummary
import styled from 'styled-components'
const MovieSummaryContainer = styled.div`
  padding: 10px;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(0, 0, 0, 0.25);
  display: flex;
  gap: 10px;
`
const LeftSection = styled.div``

const Poster = styled.div`
  position: relative;
  border-radius: 5px;
  // todo
  width: 94px;
  height: 141px;
  background: url(${(props) => props.imageUrl}) lightgray 50% / cover no-repeat;
`

const RightSection = styled.div`
  width: 100%;
`

const RightHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
`

const RightTitleWrap = styled.div`
  display: flex;
  align-items: center;
`

const RightTitle = styled.div`
  color: #fff;
  /* bold/lg */
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 30px; /* 150% */
`

const RightYear = styled.div`
  color: #fff;

  /* light/md */
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 200;
  line-height: 24px; /* 150% */
`

const RightRating = styled.div`
  text-transform: uppercase;
  color: var(--gray-300, #d4d4d8);
  text-align: right;

  /* regular/sm */
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 21px; /* 150% */
`
const MovieInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
`
const InfoWrap = styled.div`
  display: flex;
  align-items: center;
`
const CalendarIcon = styled.img`
  width: 16px;
  height: 16px;
  justify-content: center;
  align-items: center;
  margin-right: 4px;
`
const ReleaseDate = styled.div`
  color: var(--gray-200, #e4e4e7);
  /* regular/sm */
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 21px; /* 150% */
`

const ClockIcon = styled.img`
  width: 16px;
  height: 16px;
  margin-right: 4px;
`

const RunningTime = styled.div`
  color: var(--gray-200, #e4e4e7);
  /* regular/sm */
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 21px; /* 150% */
`
const MovieGenreWrap = styled.div`
  display: flex;
  gap: 10px;
`
