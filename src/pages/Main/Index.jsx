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
<<<<<<< HEAD
import GenreButton from '@/components/common/GenreButton'
import ReviewSwiper from '@/components/reviewSwiper/ReviewSwiper'
=======
import { reviewData } from '@/assets/data/reviewData'
import BackgroundContainer from '@/components/common/BackgroundContainer'
>>>>>>> 8cd0d877448b89126e7a5c5a8a98d5787d51abf4

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
  // const genreData = ['전체', '액션', '모험']
  return (
<<<<<<< HEAD
    <div style={{ width: '100%' }}>
=======
    <BackgroundContainer>
      <Wrap>
        <Stories dataList={reviewData} path={'/main/story'} />
      </Wrap>
>>>>>>> 8cd0d877448b89126e7a5c5a8a98d5787d51abf4
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
          {isLogin === false ? '' : <MainPageSubTitle time={nowDate.getHours()} />}
        </div>
        <SearchBar />
      </MainPageTopContainer>
      <MainPageBodyContainer>
        <div style={{ gap: '40px', display: 'flex' }}>
          <div>
            <MainPageSliderWrapper>
              <MainPageWrapperTitle>{'최신 스토리'}</MainPageWrapperTitle>
              <Wrap>
                <Stories />
              </Wrap>
            </MainPageSliderWrapper>
          </div>
          <div style={{ flex: '1' }}>
            <MainPageSliderWrapper>
              <MainPageWrapperTitle>{`${nowDate.getMonth() + 1}월 ${nowDate.getDate()}일 박스오피스 순위`}</MainPageWrapperTitle>
              <MainPageBoxOfficeSwiperWrapper>
                <Swiper slidesPerView={4.3} spaceBetween={10} style={{ maxWidth: '1038px' }}>
                  {boxOfficeMovieData.map((item, index) => (
                    <SwiperSlide key={index}>
                      <BoxOfficePosterCard movieInfo={item} />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </MainPageBoxOfficeSwiperWrapper>
            </MainPageSliderWrapper>
          </div>
        </div>

        <MainPageSliderWrapper>
          <MainPageWrapperTitle>{'추천영화'}</MainPageWrapperTitle>
          <SuggestMovieBox
            isLogin={isLogin}
            // genreData={genreData}
            suggestMovieData={suggestMovieData}
          />
        </MainPageSliderWrapper>
        <ReviewSwiper />
      </MainPageBodyContainer>
    </BackgroundContainer>
  )
}

const MainPageTopContainer = styled.div`
  display: flex;
  width: 1200px;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding-top: 110px;
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
  width: 100%;
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

const Wrap = styled.div`
  display: flex;
  justify-content: center;
`

export default MainPage
