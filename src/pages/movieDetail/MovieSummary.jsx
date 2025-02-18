import React from 'react'
import calendar from '@/assets/icons/calendar-tick.svg'
import clock from '@/assets/icons/clock.svg'
import GenreButton from '@/components/common/GenreButton'
import styled from 'styled-components'
import media from '@/styles/media'
import { getStatusColor, mapMovieStatus } from '@/utils/statusMapper'
import * as S from '@/styles/movieSummary/MovieSummary.style.'
import SkeletonMovieSummary from './skeleton/SkeletonMovieSummary'
function MovieSummary({ data, loading }) {
  const posterImageUrl = data?.poster?.filePath
    ? `https://image.tmdb.org/t/p/w300${data.poster.filePath}`
    : '/images/default.png'
  const title = data?.title
  const year = data?.releaseDate.split('-')[0] // "2024-11-13" → "2024"
  const certification = data?.certification || ''
  const releaseDate = data?.releaseDate
  const runningTime = `${Math.floor(data?.runtime / 60)}시간 ${data?.runtime % 60}분` // 148 → "2시간 28분"
  const status = mapMovieStatus(data?.status)
  const statusColor = getStatusColor(data?.status)
  if (loading) {
    return <SkeletonMovieSummary />
  }
  return (
    <>
      <MovieSummaryContainer>
        <LeftSection>
          <Poster $imageurl={posterImageUrl} />
        </LeftSection>
        <RightSection>
          <RightHeader>
            <RightTitleWrap>
              <RightTitle>{title}</RightTitle>
              <RightYear>({year})</RightYear>
            </RightTitleWrap>
            <RightRating>{certification}</RightRating>
          </RightHeader>
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
              {data?.genres.map((genre) => (
                <GenreButton key={genre.genreId} fontSize={14} radius={10} category={genre.name} />
              ))}
            </MovieGenreWrap>
            <MovieStatusWrap>
              <S.StatusCircle $color={statusColor} />
              <S.StatusText>{status}</S.StatusText>
            </MovieStatusWrap>
          </Wrap>
        </RightSection>
      </MovieSummaryContainer>
    </>
  )
}

export default MovieSummary
const MovieSummaryContainer = styled.div`
  padding: 10px;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(0, 0, 0, 0.25);
  display: flex;
  width: 100%;
  gap: 10px;
`
const LeftSection = styled.div`
  width: auto;
  display: inline-flex;
  justify-content: center;
`

const Poster = styled.div`
  position: relative;
  border-radius: 5px;
  aspect-ratio: 94 / 141; /* 비율을 94:141로 고정 */
  background: url(${(props) => props.$imageurl}) lightgray 50% / cover no-repeat;
  /* 너비를 뷰포트 너비에 따라 서서히 변경 */
  width: clamp(94px, 20vw, 160px);
`

const RightSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`

const RightHeader = styled.div`
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
  gap: 10px;
`
const RightTitleWrap = styled.div`
  display: flex;
  align-items: center;
  ${media.medium`
    display:flex;
    flex-direction: column;
    align-items: flex-start;
  `}
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
  ${media.medium`
    font-size: calc(16px + 0.5vw);
  `}
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
  ${media.medium`
    font-size: calc(14px + 0.5vw);
  `}
`
const MovieGenreWrap = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`
const MovieStatusWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;
`
