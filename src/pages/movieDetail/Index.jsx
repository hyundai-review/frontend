import React, { useEffect, useState } from 'react'
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
import useMovieData from '@/hooks/useMovieData'
import { useParams } from 'react-router-dom'
import { useApi } from '@/libs/useApi'
function MovieDetailPage() {
  const { movieId } = useParams()
  // const { data: detailMovie, isLoading, isError } = useMovieData('detail', movieId)
  const { get, loading, error } = useApi(false) // 인증이 필요한 API 요청을 사용
  const [movieDetail, setMovieDetail] = useState(null)

  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        const data = await get(`/api/movies/details/${movieId}`)
        setMovieDetail(data)
        console.log(data)
      } catch (err) {
        console.error('영화 정보를 가져오는 중 오류가 발생했습니다:', err)
      }
    }
    fetchMovieDetail()
  }, [movieId]) // movieId가 변경될 때마다 API 요청을 새로 보냄

  // const posterImageUrl =
  //   'https://img.cgv.co.kr/Movie/Thumbnail/StillCut/000088/88847/88847230819_727.jpg'
  const posterImageUrl = `https://image.tmdb.org/t/p/w300/${movieDetail.poster.filePath}`
  const screenSize = useResponsive()
  useEffect(() => {
    console.log(movieId)
  }, [])
  return (
    <>
      <Wrap imageUrl={posterImageUrl}>
        <BlurOverlay>
          <Container>
            <Header>
              <LeftIcon src={arrowLeft} />
            </Header>
            <ContentsWrap>
              {screenSize === 'medium' || screenSize === 'large' ? (
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
const Container = styled.div``
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
