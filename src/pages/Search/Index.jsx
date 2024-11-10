import React from 'react'
import MoviePosterBox from '@/components/MoviePosterCard/MoviePosterCard.jsx'
import * as S from './style.js'
import SearchBar from '@/components/SearchBar/SearchBar.jsx'

function SearchPage() {
  const movieDataArray = [...Array(10)].map((_, index) => ({
    id: index,
    imageUrl: 'https://image.tmdb.org/t/p/w300/tKV0etz5OIsAjSNG1hJktsjbNJk.jpg',
  }))
  const handleSearch = (inputValue) => {
    console.log(`이 값으로 검색 시작${inputValue}`)
  }
  return (
    <div>
      <S.StyledSearchPageContainer>
        <SearchBar handleSearch={handleSearch} />
        <S.StyledSearchPageBodyWrapper>
          <S.StyledSearchPageResultWrapper>{`검색결과 - ${movieDataArray.length}건`}</S.StyledSearchPageResultWrapper>
          <S.StyledMoviePosterWrapper>
            {movieDataArray.map((item, index) => (
              <MoviePosterBox moviePosterUrl={item.imageUrl} movieId={item.id} key={index} />
            ))}
          </S.StyledMoviePosterWrapper>
        </S.StyledSearchPageBodyWrapper>
      </S.StyledSearchPageContainer>
    </div>
  )
}

export default SearchPage
