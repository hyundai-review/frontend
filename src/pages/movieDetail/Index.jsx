import React from 'react'
import MovieSummary from './MovieSummary'
import arrowLeft from '@/assets/icon/arrow-left.svg'
function MovieDetailPage() {
  const posterImageUrl =
    'https://img.cgv.co.kr/Movie/Thumbnail/StillCut/000088/88847/88847230819_727.jpg'
  return (
    <>
      <Wrap imageUrl={posterImageUrl}>
        <BlurOverlay>
          <MovieDetail>
            <MovieDetailHeader>
              <LeftIcon src={arrowLeft} />
            </MovieDetailHeader>
            <MovieSummary />
            {/* <MovieOverviewWrap>
              <MovieOverviewTitle />
              <MovieOverviewBox>
                <MovieOverviewSummary>{ movieOverviewSummary}</MovieOverviewSummary>
                <MovieOverviewContent>{movieOverviewContent}</MovieOverviewContent>
              </MovieOverviewBox>
              <MovieCastWrap>
                <MovieCastCard />
              </MovieCastWrap>
            </MovieOverviewWrap> */}
          </MovieDetail>
        </BlurOverlay>
      </Wrap>
    </>
  )
}

export default MovieDetailPage
import styled from 'styled-components'
import media from '@/styles/media'
const Wrap = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  background: url(${(props) => props.imageUrl});
  background-size: cover;
  background-position: center;
`

const BlurOverlay = styled.div`
  width: 100%;
  height: 100%;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(20px);
`
const MovieDetail = styled.div`
  padding: 20px;
`
const MovieDetailHeader = styled.div`
  margin-bottom: 12px;
  ${media.small`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  `}
  ${media.large`
    margin-bottom: 80px;
  `}
`
const LeftIcon = styled.img`
  cursor: pointer;
  width: 24px;
  height: 24px;
  ${media.large`
    display: none;
  `}
`
