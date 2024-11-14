import React from 'react'
import calendar from '@/assets/icons/calendar-tick.svg'
import clock from '@/assets/icons/clock.svg'
import GenreButton from '@/components/common/GenreButton'
import styled from 'styled-components'
import media from '@/styles/media'
function MovieSummaryLarge() {
  const posterImageUrl =
    'https://img.cgv.co.kr/Movie/Thumbnail/StillCut/000088/88847/88847230819_727.jpg'
  const title = '청설'
  const year = '2024'
  const rating = 'all'
  const releaseDate = '2024.11.09'
  const runningTime = '1시간 50분'
  const status = '상영 중'
  return (
    <MovieSummaryContainer>
      <ImageWrap>
        <Poster imageUrl={posterImageUrl} />
      </ImageWrap>
      <ContentsContainer>
        <Header>
          <TitleWrap>
            <Title>{title}</Title>
            <Year>({year})</Year>
          </TitleWrap>
          <Rating>{rating}</Rating>
        </Header>
        <Wrap>
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
          <MovieStatusWrap>
            <StatusCircle />
            <StatusText>{status}</StatusText>
          </MovieStatusWrap>
        </Wrap>
      </ContentsContainer>
    </MovieSummaryContainer>
  )
}

export default MovieSummaryLarge
const MovieSummaryContainer = styled.div`
  padding: 10px;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(0, 0, 0, 0.25);
  display: flex;
  width: 100%;
  gap: 10px;
`
const ImageWrap = styled.div`
  width: auto;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`

const Poster = styled.div`
  position: relative;
  border-radius: 5px;
  aspect-ratio: 94 / 141; /* 비율을 94:141로 고정 */
  background: url(${(props) => props.imageUrl}) lightgray 50% / cover no-repeat;
  /* 너비를 뷰포트 너비에 따라 서서히 변경 */
  width: clamp(94px, 20vw, 160px);
`

const ContentsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
`
const Wrap = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`
const TitleWrap = styled.div`
  display: flex;
  align-items: center;
`

const Title = styled.div`
  color: #fff;
  /* bold/lg */
  font-family: Pretendard;
  font-size: 32px;
  font-style: normal;
  font-weight: 700;
  line-height: 30px; /* 150% */
  ${media.medium`
    font-size: calc(20px + 0.5vw);
  `}
`

const Year = styled.div`
  color: #fff;
  /* light/md */
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 200;
  line-height: 24px; /* 150% */
  ${media.medium`
    font-size: calc(16px + 0.5vw);
  `}
`

const Rating = styled.div`
  text-transform: uppercase;
  color: var(--gray-300, #d4d4d8);
  text-align: right;
  /* regular/sm */
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 21px; /* 150% */
  ${media.medium`
    font-size: calc(14px + 0.5vw);
  `}
`
const MovieInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* margin-bottom: 12px; */
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
  ${media.medium`
    width: 1em;
    height: 1em;
  `}
`
const ReleaseDate = styled.div`
  color: var(--gray-200, #e4e4e7);
  /* regular/sm */
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 21px; /* 150% */
  ${media.medium`
    font-size: calc(14px + 0.5vw);
  `}
`

const ClockIcon = styled.img`
  width: 16px;
  height: 16px;
  margin-right: 4px;
  ${media.medium`
    width: 1em;
  height: 1em;
  `}
`

const RunningTime = styled.div`
  color: var(--gray-200, #e4e4e7);
  /* regular/sm */
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 21px; /* 150% */
  ${media.medium`
    font-size: calc(14px + 0.5vw);
  `}
`
const MovieGenreWrap = styled.div`
  display: flex;
  gap: 10px;
`
const MovieStatusWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;
`

const StatusCircle = styled.div`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: var(--semantic-success, #7ed6a0);
  // TODO(k) status에 따라 색 변경
  box-shadow: 0px 0px 10px var(--semantic-success, #7ed6a0);
`
const StatusText = styled.div`
  color: var(--gray-200, #e4e4e7);
  text-align: right;
  /* regular/sm */
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 21px; /* 150% */
`
