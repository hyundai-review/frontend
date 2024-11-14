import BoxOfficePosterCard from '@/components/common/BoxOfficePosterCard'
import SearchBar from '@/components/common/SearchBar'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import SuggestMovieBox from './SuggestMovieBox'
import MainPageSubTitle from './MainPageSubTitle'
import media from '@/styles/media'
import Stories from '@/components/story/Stories'
import { reviewData } from '@/assets/data/reviewData'
import BackgroundContainer from '@/components/common/BackgroundContainer'
import Header from '@/components/common/Header'
import MobileNavigationBar from '@/components/common/MobileNavigationBar'

/*boxOfficeMovieData - url, rank, date
suggestMovieData - moviePosterUrl, movieID */
// TODO(j) 로그인시 isLogin에 상태 저장할것s
function MainPage() {
  const navigate = useNavigate()
  const [isLogin, setIsLogin] = useState(true)
  const userName = '테스트'
  const nowDate = new Date()
  const [screenWidth, setScreenWidth] = useState(document.documentElement.clientWidth)
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(document.documentElement.clientWidth)
    }

    // 이벤트 리스너 등록
    window.addEventListener('resize', handleResize)

    // 컴포넌트가 언마운트될 때 리스너 제거
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])
  const boxOfficeMovieData = [...Array(10)].map((_, index) => ({
    imageUrl: 'https://image.tmdb.org/t/p/w300/tKV0etz5OIsAjSNG1hJktsjbNJk.jpg',
    rank: index + 1,
    date: '2024.11.11',
  }))
  const suggestMovieData = [...Array(10)].map((_, index) => ({
    moviePosterUrl: 'https://image.tmdb.org/t/p/w300/tKV0etz5OIsAjSNG1hJktsjbNJk.jpg',
    movieId: index + 1,
  }))
  return (
    <div>
      <BackgroundContainer>
        <div style={{ width: '100%' }}>
          <MainPageTopContainer>
            <MainPageTopWrapper>
              <MainPageTitle>
                {isLogin === false ? '로그인이 필요합니다.' : `${userName}님,`}
              </MainPageTitle>
              {isLogin === false ? '' : <MainPageSubTitle time={nowDate.getHours()} />}
            </MainPageTopWrapper>
            <SearchBar />
          </MainPageTopContainer>
          <MainPageBodyContainer>
            <MainPageBodyTopWrapper>
              <div>
                <MainPageSliderWrapper>
                  <MainPageWrapperTitle>{'최신 스토리'}</MainPageWrapperTitle>
                  <Wrap>
                    <Stories dataList={reviewData} path={'/main/story'} />
                  </Wrap>
                </MainPageSliderWrapper>
              </div>
              <div style={{ flex: '1' }}>
                <MainPageSliderWrapper>
                  <MainPageWrapperTitle>{`${nowDate.getMonth() + 1}월 ${nowDate.getDate()}일 박스오피스 순위`}</MainPageWrapperTitle>
                  <MainPageBoxOfficeSwiperWrapper $width={screenWidth - 402}>
                    <Swiper spaceBetween={7} slidesPerView={'auto'}>
                      {boxOfficeMovieData.map((item, index) => (
                        <MainPageSwiperSlide key={index}>
                          <BoxOfficePosterCard movieInfo={item} />
                        </MainPageSwiperSlide>
                      ))}
                    </Swiper>
                  </MainPageBoxOfficeSwiperWrapper>
                </MainPageSliderWrapper>
              </div>
            </MainPageBodyTopWrapper>
            <MainPageSliderWrapper>
              <MainPageWrapperTitle>{'추천영화'}</MainPageWrapperTitle>
              <SuggestMovieBox isLogin={isLogin} suggestMovieData={suggestMovieData} />
            </MainPageSliderWrapper>
          </MainPageBodyContainer>
        </div>
      </BackgroundContainer>
    </div>
  )
}

const MainPageTopContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding-top: 131px;
  padding-bottom: 110px;
  gap: 40px;
`
const MainPageTitle = styled.div`
  width: fit-content;
  height: 48px;
  color: var(--color-gray-50);
  text-shadow: 0px 0px 10px rgba(199, 125, 181, 0.5);
  line-height: 48px;
  font-size: 32px;
`
const MainPageTopWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

const MainPageBodyContainer = styled.div`
  display: flex;
  justify-content: start;
  flex-direction: column;
  gap: 30px;
  padding-bottom: 20px;
`

const MainPageBodyTopWrapper = styled.div`
  gap: 40px;
  display: flex;
  flex-direction: row;
  ${media.medium`
    flex-direction:column
  `}
`

const MainPageSwiperSlide = styled(SwiperSlide)`
  max-width: 250px;
  display: flex;
  overflow: hidden;
  ${media.small`
    max-width: 150px
  `}
`

const MainPageWrapperTitle = styled.p`
  color: var(--color-gray-200);
  line-height: 30px;
  font-size: 20px;
  font-weight: 200;
  padding-left: 20px;
`

const MainPageBoxOfficeSwiperWrapper = styled.div`
  max-width: 998px;
  width: ${(props) => props.$width}px;
  position: relative;
  height: fit-content;
  overflow: visible;
  &::after {
    content: '';
    position: absolute;
    top: 19px;
    right: 0;
    width: 5%;
    height: 280px;
    background: linear-gradient(to left, rgba(0, 0, 0, 1), rgba(255, 255, 255, 0));
    z-index: 1;
  }
  ${media.medium`
    width: ${(props) => props.$width + 402}px
  `}
  ${media.small`
    width:391px;
    &::after{
      height: 172px
    }
  `}
`
const MainPageSliderWrapper = styled.div`
  width: 100%;
  display: flex;
  height: fit-content;
  flex-direction: column;
  gap: 10px;
  overflow: hidden;
`

const Wrap = styled.div`
  display: flex;
  justify-content: center;
`

export default MainPage
