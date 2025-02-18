import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import media from '@/styles/media'
import MovieOverview from './MovieOverview'
import MovieReview from './MovieReview'
import MovieSummary from './MovieSummary'
import arrowLeft from '@/assets/icons/arrow-left.svg'
import ActorCard from './ActorCard'
import useResponsive from '@/hooks/useResponsive'
import MovieSummaryLarge from './MovieSummaryLarge'
import { useNavigate, useParams } from 'react-router-dom'
import { useApi } from '@/libs/useApi'
import useReviewStore from '@/store/reviewStore'
import useScrollToTop from '@/hooks/useScrollToTop'

function MovieDetailPage() {
  useScrollToTop() // 페이지 로드 시 스크롤을 최상단으로 이동
  const { movieId } = useParams()
  const screenSize = useResponsive()
  const navigate = useNavigate()

  const handleBack = () => {
    console.log('뒤로가기')
    navigate(-1) // 뒤로가기
  }
  const { setBackgroundImg, setCurrentMovieId } = useReviewStore()

  useEffect(() => {
    console.log(movieId)
  }, [])
  // ----------------------  API 요청 ----------------------
  const { get, loading, error } = useApi(false)
  const [data, setData] = useState(null)

  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        const data = await get(`/movies/details/${movieId}`)
        setData(data.data)

        setCurrentMovieId(movieId)
        setBackgroundImg(`${import.meta.env.VITE_IMG_PROXY_URL}${data.data.poster.filePath}`)
      } catch (err) {
        console.error('영화 정보를 가져오는 중 오류가 발생했습니다:', err)
      }
    }
    fetchMovieDetail()
  }, [movieId])

  return (
    <>
      <Wrap $imageurl={`https://image.tmdb.org/t/p/w300/${data?.poster.filePath}`}>
        <BlurOverlay>
          <Container>
            <Header>
              <LeftIcon
                src={arrowLeft}
                onClick={() => {
                  handleBack()
                }}
              />
            </Header>
            <ContentsWrap>
              {screenSize === 'medium' || screenSize === 'large' ? (
                <MovieSummaryLarge data={data} loading={loading} />
              ) : (
                <>
                  <MovieSummary data={data} loading={loading} />
                  <MovieOverview data={data} loading={loading} />
                </>
              )}
              <ActorCard data={data} loading={loading} />
              <MovieReview loading={loading} />
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
const Container = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 70px 30px;
  /* background-color: #fff; */
  @media (min-width: 1441px) {
    padding: 0 20px;
  }
  ${media.small`
    padding: 20px;
    padding-bottom: 80px;
    `}
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
