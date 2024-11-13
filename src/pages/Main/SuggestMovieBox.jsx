import BoxOfficePosterCard from '@/components/common/BoxOfficePosterCard'
import Button from '@/components/common/Button'
import MoviePosterCard from '@/components/common/MoviePosterCard'
import media from '@/styles/media'
import React, { useState } from 'react'
import styled from 'styled-components'
import MainGenreButton from './MainGenreButton'
import { useNavigate } from 'react-router-dom'
import { genres } from '@/assets/data/genresData'

function SuggestMovieBox({ isLogin, suggestMovieData }) {
  const [selectedGenre, setSelectedGenre] = useState('all')
  const navigate = useNavigate()

  const handleGenreClick = (id) => {
    setSelectedGenre(id)
    console.log(id)
    // navigate(`/movie/category/${id}`)
    // NOTE(k) 스크롤 유지 처리
  }
  return (
    <div>
      {isLogin === false ? (
        <NotLogInMovieBoxWrapper>
          <p style={{ color: `var(--color-gray-50)`, fontWeight: 'bold' }}>회원가입</p>
          <p>을 통해 맞춤 추천을 받아보세요!</p>
        </NotLogInMovieBoxWrapper>
      ) : (
        <div>
          <MainPageButtonWrapper>
            {/*
              장르 데이터 개수 나오면 한줄에 보여줄 button개수 지정
            */}
            {/* {genreData.map((item, index) => (
              // <Button text={`${item}`} key={index}></Button>
              <MainGenreButton text={`${item}`} key={index} />
            ))} */}
            {genres.map((genre) => (
              <MainGenreButton
                key={genre.id}
                text={genre.name}
                onClick={() => handleGenreClick(genre.id)}
                isActive={selectedGenre === genre.id}
              />
            ))}
          </MainPageButtonWrapper>
          <MainPageSuggestMovieWrapper>
            {suggestMovieData.map((item, index) => (
              <MoviePosterCard moviePosterUrl={item.moviePosterUrl} movieId={index} key={index} />
            ))}
          </MainPageSuggestMovieWrapper>
        </div>
      )}
    </div>
  )
}

const MainPageSuggestMovieWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 180px);
  width: 100%;
  gap: 60px;
  justify-content: start;
  flex-direction: column;
  place-items: center;
  ${media.small`
    grid-template-columns: repeat(3, 130px);
    gap : 2px
  `}
`

const MainPageButtonWrapper = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`

const NotLogInMovieBoxWrapper = styled.div`
  width: 100%;
  height: 100px;
  background: rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--color-gray-400);
`

export default SuggestMovieBox
