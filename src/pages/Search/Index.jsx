import React, { useEffect, useState } from 'react'
import MoviePosterCard from '@/components/moviePosterCard/MoviePosterCard.jsx'
import SearchBar from '@/components/common/SearchBar.jsx'
import media from '@/styles/media'
import styled from 'styled-components'
import { useSearchParams } from 'react-router-dom'
import { nonAuthenticated } from '@/libs/axiosInstance'
import axios from 'axios'
//TODO(j) axios 한군데 모으기
function SearchPage() {
  // const [movieDataArray, setMovieDataArray] = useState([])
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q') || ''
  const searchWihValue = async (inputValue) => {
    const queryParams = { keyword: inputValue, page: 0 }
    try {
      const getMovieData = await nonAuthenticated.get('/api/movies/search', {
        params: queryParams,
      })
      // setMovieDataArray(getMovieData.data.content)
    } catch (e) {
      console.log(error)
    }
  }
  const handleSearch = (inputValue) => {}
  // useEffect(() => {
  //   if (query !== '') {
  //     handleSearch(query)
  //   } else {
  //     console.log(query)
  //   }
  // }, [query])
  const movieDataArray = [...Array(10)].map((_, index) => ({
    movieId: index,
    poster: 'https://image.tmdb.org/t/p/w300/tKV0etz5OIsAjSNG1hJktsjbNJk.jpg',
    title: '청설',
    releaseDate: '2024',
  }))
  return (
    <div>
      <SearchPageContainer>
        <SearchBar defaultValue={query} />
        <SearchPageBodyWrapper>
          <SearchPageResultWrapper>{`검색결과 - ${movieDataArray.length}건`}</SearchPageResultWrapper>
          <MoviePosterWrapper>
            {movieDataArray.map((item, index) => (
              <MoviePosterCard movieInfo={item} key={index} />
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
  color: var(--color-gray-200);
  width: 100%;
  box-sizing: border-box;
  font-size: 20px;
  line-height: 30px;
  font-weight: 200;
  margin-bottom: 20px;
  padding-left: 20px;
`

const SearchPageContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  padding-top: 130px;
  padding-bottom: 20px;
`

const MoviePosterWrapper = styled.div`
  display: grid;
  justify-content: start;
  place-items: center;
  gap: 9px 60px;
  padding-left: 20px;
  grid-template-columns: repeat(auto-fill, 180px);
  ${media.small`
  grid-template-columns: repeat(3,130px);
  gap:1px;
  padding-left:10px;
  `}
`

export default SearchPage
