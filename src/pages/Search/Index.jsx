import React from 'react'
import MoviePosterBox from '@/components/common/MoviePosterCard.jsx'
import SearchBar from '@/components/common/SearchBar.jsx'
import media from '@/styles/media'
import styled from 'styled-components'

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
      <SearchPageContainer>
        <SearchBar handleSearch={handleSearch} />
        <SearchPageBodyWrapper>
          <SearchPageResultWrapper>{`검색결과 - ${movieDataArray.length}건`}</SearchPageResultWrapper>
          <MoviePosterWrapper>
            {movieDataArray.map((item, index) => (
              <MoviePosterBox moviePosterUrl={item.imageUrl} movieId={item.id} key={index} />
            ))}
          </MoviePosterWrapper>
        </SearchPageBodyWrapper>
      </SearchPageContainer>
    </div>
  )
}

const SearchPageBodyWrapper = styled.div`
  width: 100%;
`

const SearchPageResultWrapper = styled.div`
  height: 30px;
  width: fit-content;
  color: gray;
  width: 100%;
  padding-left: 50px;
  box-sizing: border-box;
  ${media.medium`
  padding-left:30px`}
`

const SearchPageContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  padding-top: 20px;
`

const MoviePosterWrapper = styled.div`
  display: grid;
  justify-content: center;
  place-items: center;
  gap: 40px;
  grid-template-columns: repeat(6, 180px);
  //더 부드러운 반응형
  @media (max-width: 1280px) {
    grid-template-columns: repeat(auto-fill, 180px);
  }
  ${media.small`
  grid-template-columns: repeat(3,130px);
  gap:2px
  `}
`

export default SearchPage
