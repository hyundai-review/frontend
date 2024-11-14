import React from 'react'
import styled from 'styled-components'
import media from '@/styles/media'
import MovieOverview from './MovieOverview'
import MovieReview from './MovieReview'
import MovieSummary from './MovieSummary'
import arrowLeft from '@/assets/icons/arrow-left.svg'
import ActorCard from './ActorCard'
import actorData from '@/assets/data/actorsData'
import useResponsive from '@/hooks/useResponsive'
import MovieSummaryLarge from './MovieSummaryLarge'
function MovieDetailPage() {
  const posterImageUrl =
    'https://img.cgv.co.kr/Movie/Thumbnail/StillCut/000088/88847/88847230819_727.jpg'
  const screenSize = useResponsive()
  return (
    <>
      <Wrap imageUrl={posterImageUrl}>
        <BlurOverlay>
          <Container>
            <Header>
              <LeftIcon src={arrowLeft} />
            </Header>
            <ContentsWrap>
              {screenSize === 'large' ? (
                <MovieSummaryLarge />
              ) : (
                <>
                  <MovieSummary />
                  <MovieOverview />
                </>
              )}
              <ActorCard data={actorData} />
              <MovieReview />
            </ContentsWrap>
          </Container>
        </BlurOverlay>
      </Wrap>
    </>
  )
}

export default MovieDetailPage
const Wrap = styled.div`
  position: relative;
  height: auto;
  background: url(${(props) => props.imageUrl});
  background-size: cover;
  background-position: center;
`

const BlurOverlay = styled.div`
  width: 100%;
  height: auto;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(20px);
`
const Container = styled.div`
  // WARNING(k): 100px padding은 임시. 이후 수정필요
  /* padding: 50px 100px; */
`
const ContentsWrap = styled.div`
  display: flex;
  flex-direction: column;
`
const Header = styled.div`
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
