import BoxOfficePosterCard from '@/components/common/BoxOfficePosterCard'
import MoviePosterCard from '@/components/common/MoviePosterCard'
import SearchBar from '@/components/common/SearchBar'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'

/*boxOfficeMovieData - url, rank, date
suggestMovieData - moviePosterUrl, movieID 
global color 수정시 font color 수정 */

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
    <div>
      <MainPageTopContainer>
        <MainPageTitle>
          {isLogin === false ? '로그인이 필요합니다.' : `${userName}님,`}
        </MainPageTitle>
        <SearchBar />
      </MainPageTopContainer>
      <MainPageContainer>
        <p
          style={{ color: 'white' }}
        >{`${nowDate.getMonth() + 1}월 ${nowDate.getDate()}일 박스오피스 순위`}</p>
        <MainPageSwiperWrapper>
          <Swiper slidesPerView={3.5}>
            {boxOfficeMovieData.map((item, index) => (
              <SwiperSlide>
                <BoxOfficePosterCard movieInfo={item} key={index} />
              </SwiperSlide>
            ))}
          </Swiper>
        </MainPageSwiperWrapper>
        <MainPageBodyWrapper>
          <p style={{ color: 'white' }}>추천영화</p>
          <MainPageButtonWrapper>
            {genreData.map((item, index) => (
              <button>item</button>
            ))}
          </MainPageButtonWrapper>
          <MainPageSuggestMovieWrapper>
            {suggestMovieData.map((item, index) => (
              <MoviePosterCard moviePosterUrl={item.moviePosterUrl} movieId={index} key={index} />
            ))}
          </MainPageSuggestMovieWrapper>
        </MainPageBodyWrapper>
      </MainPageContainer>
    </div>
  )
}

const MainPageTopContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding-top: 110px;
  gap: 40px;
`

//global color 설정시 추가
const MainPageTitle = styled.div`
  width: fit-content;
  height: 48px;
  color: white;
  line-height: 48px;
  font-size: 32px;
`
const MainPageContainer = styled.div`
  display: flex;
  justify-content: start;
  flex-direction: column;
`
const MainPageSwiperWrapper = styled.div`
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
const MainPageBodyWrapper = styled.div`
  width: 100%;
  display: flex;
  height: fit-content;
  flex-direction: column;
`

const MainPageSuggestMovieWrapper = styled.div`
  display: 'grid';
  grid-template-columns: repeat(6, 1fr);
  width: 100%;
  gap: 40px;
  justify-content: start;
  flex-direction: row;
`

const MainPageButtonWrapper = styled.div``

export default MainPage
