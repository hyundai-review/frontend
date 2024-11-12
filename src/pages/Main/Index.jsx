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
import BackgroundContainer from '@/components/common/BackgroundContainer'

/*boxOfficeMovieData - url, rank, date
suggestMovieData - moviePosterUrl, movieID */

function MainPage() {
  const navigate = useNavigate()
  const [isLogin, setIsLogin] = useState(true)
  const userName = '테스트'
  const nowDate = new Date()
  const boxOfficeMovieData = [...Array(10)].map((_, index) => ({
    imageUrl: 'https://image.tmdb.org/t/p/w300/tKV0etz5OIsAjSNG1hJktsjbNJk.jpg',
    rank: index + 1,
    date: '2024.11.11',
  }))
  const suggestMovieData = [...Array(10)].map((_, index) => ({
    moviePosterUrl: 'https://image.tmdb.org/t/p/w300/tKV0etz5OIsAjSNG1hJktsjbNJk.jpg',
    movieId: index + 1,
  }))
  const genreData = ['전체', '액션', '모험']
  return (
    <BackgroundContainer>
      <Wrap>
        <Stories />
      </Wrap>
      <MainPageTopContainer>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <MainPageTitle>
            {isLogin === false ? '로그인이 필요합니다.' : `${userName}님,`}
          </MainPageTitle>
          <MainPageSubTitle time={nowDate.getHours()} />
        </div>
        <SearchBar />
      </MainPageTopContainer>
      <MainPageBodyContainer>
        <div style={{ display: 'flex' }}>
          <MainPageSliderWrapper>
            <MainPageWrapperTitle>{'최신 스토리'}</MainPageWrapperTitle>
            <div style={{ width: '362px', height: '240px' }}></div>
          </MainPageSliderWrapper>
          <MainPageSliderWrapper>
            <MainPageWrapperTitle>{`${nowDate.getMonth() + 1}월 ${nowDate.getDate()}일 박스오피스 순위`}</MainPageWrapperTitle>
            <MainPageBoxOfficeSwiperWrapper>
              <Swiper slidesPerView={3.5}>
                {boxOfficeMovieData.map((item, index) => (
                  <SwiperSlide key={index}>
                    <BoxOfficePosterCard movieInfo={item} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </MainPageBoxOfficeSwiperWrapper>
          </MainPageSliderWrapper>
        </div>
        <MainPageSliderWrapper>
          <MainPageWrapperTitle>{'추천영화'}</MainPageWrapperTitle>
          <SuggestMovieBox
            isLogin={isLogin}
            genreData={genreData}
            suggestMovieData={suggestMovieData}
          />
        </MainPageSliderWrapper>
      </MainPageBodyContainer>
    </BackgroundContainer>
  )
}

const MainPageTopContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding-top: 110px;
  gap: 40px;
  padding-bottom: 110px;
`
const MainPageTitle = styled.div`
  width: fit-content;
  height: 48px;
  color: var(--color-gray-50);
  text-shadow: 0px 0px 10px rgba(199, 125, 181, 0.5);
  line-height: 48px;
  font-size: 32px;
`
const MainPageBodyContainer = styled.div`
  display: flex;
  justify-content: start;
  flex-direction: column;
`
const MainPageWrapperTitle = styled.p`
  color: var(--color-gray-200);
  line-height: 30px;
  font-size: 20px;
  font-weight: 200;
`

const MainPageBoxOfficeSwiperWrapper = styled.div`
  width: 800px;
  position: relative;
  height: fit-content;
  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 5%;
    height: 100%;
    background: linear-gradient(to left, rgba(0, 0, 0, 1), rgba(255, 255, 255, 0));
    z-index: 1;
  }
`
const MainPageSliderWrapper = styled.div`
  width: 100%;
  display: flex;
  height: fit-content;
  flex-direction: column;
  gap: 10px;
`

export default MainPage

const Wrap = styled.div`
  display: flex;
  justify-content: center;
`
