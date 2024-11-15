import BoxOfficePosterCard from '@/components/common/BoxOfficePosterCard'
import SearchBar from '@/components/common/SearchBar'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import SuggestMovieBox from './SuggestMovieBox'
import media from '@/styles/media'
import Stories from '@/components/story/Stories'
import { reviewData } from '@/assets/data/reviewData'
import BackgroundContainer from '@/components/common/BackgroundContainer'
import Header from '@/components/common/Header'
import MobileNavigationBar from '@/components/common/MobileNavigationBar'
import useAuthStore from '@/store/authStore'
import { authenticated, nonAuthenticated } from '@/libs/axiosInstance'
import OverlayPosterCard from '@/components/moviePosterCard/OverlayPosterCard'
import { isLoggedIn, userData } from '@/utils/logInManager'

/*boxOfficeMovieData - url, rank, date
suggestMovieData - moviePosterUrl, movieID */
// TODO(j) 로컬 스토리지로 불러오는 값 훅으로 빼기 + 시간 계산도 util로 빼기
function MainPage() {
  const navigate = useNavigate()
  const [isLogIn, setIsLogIn] = useState(isLoggedIn())
  const [data, setData] = useState(userData())
  const nowDate = new Date()
  const chkTime = (time) => {
    if (time < 5) {
      return '밤'
    } else if (time < 12) {
      return '아침'
    } else if (time < 18) {
      return '낮'
    } else if (time < 22) {
      return '저녁'
    } else {
      return '밤'
    }
  }
  const timeText = chkTime(nowDate.getHours())
  const [screenWidth, setScreenWidth] = useState(document.documentElement.clientWidth)
  const res = async () => {
    try {
      const res = await nonAuthenticated.get('/api/movies/boxoffice')
      console.log(res)
    } catch (e) {
      console.log(e)
    }
  }
  useEffect(() => {
    setIsLogIn(isLoggedIn())
    setData(userData())
    const handleResize = () => {
      setScreenWidth(document.documentElement.clientWidth)
    }
    window.addEventListener('resize', handleResize)
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
      <MainPageTopContainer>
        <MainPageTopWrapper>
          <MainPageTitle>{!isLogIn ? '로그인이 필요합니다.' : `${data.nickname}님,`}</MainPageTitle>
          {!isLogIn ? (
            ''
          ) : (
            <MainPageSubTitle>
              {`좋은 ${timeText}이에요! 어떤 영화 리뷰를 찾으시나요?`}{' '}
            </MainPageSubTitle>
          )}
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
          <SuggestMovieBox isLogin={isLogIn} suggestMovieData={suggestMovieData} />
        </MainPageSliderWrapper>
      </MainPageBodyContainer>
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

const MainPageSubTitle = styled.p`
  color: var(--color-gray-300);
  font-weight: 100;
`

const MainPageBodyContainer = styled.div`
  display: flex;
  justify-content: start;
  flex-direction: column;
  gap: 30px;
  padding-bottom: 20px;
  padding-left: 20px;
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
  max-width: 270px;
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
`

const MainPageBoxOfficeSwiperWrapper = styled.div`
  max-width: 998px;
  width: ${(props) => props.$width - 20}px;
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
  gap: 8px;
  overflow: hidden;
`

const Wrap = styled.div`
  display: flex;
  justify-content: center;
`

export default MainPage
