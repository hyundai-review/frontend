import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import media from '@/styles/media'
import MovieOverview from './MovieOverview'
import MovieReview from './MovieReview'
import MovieSummary from './MovieSummary'
import arrowLeft from '@/assets/icons/arrow-left.svg'
import ActorCard from './ActorCard'
// import actorData from '@/assets/data/actorsData'
import useResponsive from '@/hooks/useResponsive'
import MovieSummaryLarge from './MovieSummaryLarge'
import { useParams } from 'react-router-dom'
import { useApi } from '@/libs/useApi'
function MovieDetailPage() {
  const { movieId } = useParams()
  const screenSize = useResponsive()
  useEffect(() => {
    console.log(movieId)
  }, [])
  // ----------------------  API 요청 ----------------------
  const { get, loading, error } = useApi(false)
  const [data, setData] = useState(null)
  const [tmp, setTmp] = useState('')

  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        const data = await get(`/movies/details/${movieId}`)
        setData(data)
        console.log(data)
      } catch (err) {
        console.error('영화 정보를 가져오는 중 오류가 발생했습니다:', err)
      }
    }
    fetchMovieDetail()
  }, [])

  return (
    <>
      <Wrap $imageurl={`https://image.tmdb.org/t/p/w300/${data?.poster.filePath}`}>
        <BlurOverlay>
          <Container>
            <Header>
              <LeftIcon src={arrowLeft} />
            </Header>
            <ContentsWrap>
              {screenSize === 'medium' || screenSize === 'large' ? (
                <MovieSummaryLarge data={data} />
              ) : (
                <>
                  <MovieSummary data={data} />
                  <MovieOverview data={data} />
                </>
              )}
              <ActorCard data={data} />
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
  min-height: 100vh;
  height: auto;
  background: url(${(props) => props.$imageurl});
  background-size: cover;
  background-position: center;
`

const BlurOverlay = styled.div`
  width: 100%;
  min-height: 100vh;
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
