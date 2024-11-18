import React from 'react'
import calendar from '@/assets/icons/calendar-tick.svg'
import clock from '@/assets/icons/clock.svg'
import GenreButton from '@/components/common/GenreButton'
import styled from 'styled-components'
import media from '@/styles/media'
import { getStatusColor, mapMovieStatus } from '@/utils/statusMapper'
import * as S from '@/styles/movieSummary/MovieSummary.style.'
function MovieSummaryLarge({ data }) {
  // const posterImageUrl =
  //   'https://img.cgv.co.kr/Movie/Thumbnail/StillCut/000088/88847/88847230819_727.jpg'
  // const title = '청설'
  // const year = '2024'
  // const rating = 'all'
  // const releaseDate = '2024.11.09'
  // const runningTime = '1시간 50분'
  // const status = '상영 중'
  // const summary = '손으로 설렘을 말하고 가슴으로 사랑을 느끼다'
  // const contents = '대학생활은 끝났지만 하고 싶은 것도, 되고 싶은 것도 없어 고민하던 용준. '
  // ----------------------  API 요청 ----------------------
  const posterImageUrl = `https://image.tmdb.org/t/p/w500${data?.poster.filePath}`
  const title = data?.title
  const year = data?.releaseDate.split('-')[0] // "2024-11-13" → "2024"
  const certification = data?.certification === '19' ? '19+' : 'all' // 예제에 따라 변환
  const releaseDate = data?.releaseDate
  const runningTime = `${Math.floor(data?.runtime / 60)}시간 ${data?.runtime % 60}분` // 148 → "2시간 28분"
  const status = mapMovieStatus(data?.status)
  const statusColor = getStatusColor(data?.status)
  const summary = data?.tagline
  const contents = data?.overview
  return (
    <MovieSummaryContainer>
      <ImageWrap>
        <Poster $imageurl={posterImageUrl} />
      </ImageWrap>
      <ContentsContainer>
        <Header>
          <TitleWrap>
            <Title>{title}</Title>
            <Year>({year})</Year>
          </TitleWrap>
          <Rating>{certification}</Rating>
        </Header>
        <Wrap>
          <MovieInfo>
            <InfoWrapLeft>
              <InfoText>정보</InfoText>
              <BlackBoxLeft>
                <LineWrap>
                  <CalendarIcon src={calendar}></CalendarIcon>
                  <ReleaseDate>{releaseDate}</ReleaseDate>
                </LineWrap>
                <LineWrap>
                  <ClockIcon src={clock}></ClockIcon>
                  <RunningTime>{runningTime}</RunningTime>
                </LineWrap>
                <MovieGenreWrap>
                  {data?.genres.map((genre) => (
                    <GenreButton
                      key={genre.genreId}
                      fontSize={14}
                      radius={10}
                      category={genre.name}
                    />
                  ))}
                </MovieGenreWrap>
                <MovieStatusWrap>
                  <S.StatusCircle $color={statusColor} />
                  <S.StatusText>{status}</S.StatusText>
                </MovieStatusWrap>
              </BlackBoxLeft>
            </InfoWrapLeft>
            <InfoWrapRight>
              <InfoText>개요</InfoText>
              <BlackBoxRight>
                <Summary>{summary}</Summary>
                <Contents>{contents}</Contents>
              </BlackBoxRight>
            </InfoWrapRight>
          </MovieInfo>
        </Wrap>
      </ContentsContainer>
    </MovieSummaryContainer>
  )
}

export default MovieSummaryLarge
const MovieSummaryContainer = styled.div`
  padding: 20px;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(0, 0, 0, 0.25);
  display: flex;
  width: 100%;
  gap: 15px;
`
const ImageWrap = styled.div`
  width: auto;
  display: inline-flex;
`

const Poster = styled.div`
  position: relative;
  border-radius: 5px;
  aspect-ratio: 94 / 141; /* 비율을 94:141로 고정 */
  background: url(${(props) => props.$imageurl}) lightgray 50% / cover no-repeat;
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
const Wrap = styled.div``
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
  line-height: 36px;
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
  line-height: 30px;
  ${media.medium`
    font-size: calc(14px + 0.5vw);
  `}
`
const MovieInfo = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  gap: 10px;
`
const InfoWrapLeft = styled.div`
  width: 30%;
  gap: 10px;
`
const InfoWrapRight = styled.div`
  width: 70%;
  gap: 10px;
`
const InfoText = styled.div`
  color: var(--gray-200, #e4e4e7);
  /* light/lg */
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 200;
  line-height: 30px; /* 150% */
`
const BlackBoxLeft = styled.div`
  width: 100%;
  min-height: 176px;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(0, 0, 0, 0.25);
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 90%;
`
const BlackBoxRight = styled.div`
  width: 100%;
  min-height: 176px;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(0, 0, 0, 0.25);
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 90%;
`

const LineWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`
const CalendarIcon = styled.img`
  width: 20px;
  height: 20px;
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
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  ${media.medium`
    font-size: calc(14px + 0.5vw);
  `}
`

const ClockIcon = styled.img`
  width: 20px;
  height: 20px;
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
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  ${media.medium`
    font-size: calc(14px + 0.5vw);
  `}
`
const MovieGenreWrap = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 6px;
  flex-wrap: wrap;
`
const MovieStatusWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;
`

// const StatusCircle = styled.div`
//   width: 6px;
//   height: 6px;
//   border-radius: 50%;
//   background-color: ${(props) => props.$color};
//   box-shadow: 0px 0px 10px ${(props) => props.$color};
// `
// const StatusText = styled.div`
//   color: var(--gray-200, #e4e4e7);
//   text-align: right;
//   /* regular/sm */
//   font-family: Pretendard;
//   font-size: 14px;
//   font-style: normal;
//   font-weight: 400;
//   line-height: 21px; /* 150% */
// `

const Summary = styled.div`
  color: var(--gray-50, #fafafa);
  /* regular/sm */
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 21px; /* 150% */
`

const Contents = styled.div`
  color: var(--gray-400, #a1a1aa);
  /* regular/sm */
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 21px;
  /* overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis; */
`
