import BoxOfficePosterCard from '@/components/common/BoxOfficePosterCard'
import Button from '@/components/common/Button'
import MoviePosterCard from '@/components/moviePosterCard/MoviePosterCard'
import media from '@/styles/media'
import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import MainGenreButton from './MainGenreButton'
import { useNavigate } from 'react-router-dom'
import { genres } from '@/assets/data/genresData'
import { useApi } from '@/libs/useApi'
import { authenticated, nonAuthenticated } from '@/libs/axiosInstance'
import SkeletonMoviePosterCard from '@/components/moviePosterCard/skeleton/SkeletonMoviePosterCard'

function SuggestMovieBox({ isLogin, loading }) {
  const [selectedGenre, setSelectedGenre] = useState('0')
  const [suggestMovieData, setSuggestMovieData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [checkMoreData, setCheckMoreData] = useState(true)
  const [nowPage, setNowPage] = useState(0)
  const navigate = useNavigate()
  const fetchMovieData = useCallback(
    async (genre, page) => {
      if (isLogin) {
        if (isLoading || !checkMoreData) return
        setIsLoading(true)
        try {
          const queryParams = { genre: genre, page: page, size: 24 }
          const getMovieData = await authenticated.get(`/movies/recommend`, {
            params: queryParams,
          })
          const newMovies = getMovieData.data.content
          if (newMovies.length > 0) {
            setSuggestMovieData((prev) => [...prev, ...newMovies]) // 기존 데이터에 추가
          }
          setCheckMoreData(newMovies.length === 24)
        } catch (err) {
          console.error('영화 정보를 가져오는 중 오류가 발생했습니다:', err)
        } finally {
          setIsLoading(false) // 로딩 종료
        }
      }
    },
    [selectedGenre, isLoading],
  )
  useEffect(() => {
    setNowPage(0)
    setSuggestMovieData([])
    fetchMovieData(selectedGenre, 0)
    setCheckMoreData(true)
    setSelectedGenre(selectedGenre)
  }, [selectedGenre])
  useEffect(() => {}, [suggestMovieData])
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
          document.documentElement.offsetHeight - 50 && // 화면 하단 50px 전에 감지
        !isLoading
      ) {
        setNowPage((prevPage) => prevPage + 1) // 다음 페이지 요청
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [isLoading])
  useEffect(() => {
    if (nowPage > 0) {
      fetchMovieData(selectedGenre, nowPage)
    }
  }, [nowPage])

  const handleGenreClick = (id) => {
    setSelectedGenre(id)
    setCheckMoreData(true)
    // navigate(`/movie/category/${id}`)
    // NOTE(k) 스크롤 유지 처리
  }
  return (
    <div>
      {isLogin === false ? (
        <NotLogInMovieBoxWrapper>
          <SpoilerButton onClick={() => navigate('/user/login')}>회원가입</SpoilerButton>
          <p>을 통해 맞춤 추천을 받아보세요!</p>
        </NotLogInMovieBoxWrapper>
      ) : (
        <div>
          <MainPageButtonWrapper>
            {genres.map((genre) => (
              <MainGenreButton
                key={genre.id}
                text={genre.name}
                onClick={() => handleGenreClick(genre.id)}
                //string to num
                isactive={selectedGenre === genre.id}
              />
            ))}
          </MainPageButtonWrapper>
          <MainPageSuggestMovieWrapper>
            {loading
              ? Array.from({ length: 24 }).map((_, index) => (
                  <SkeletonMoviePosterCard key={index} />
                ))
              : suggestMovieData.map((item, index) => (
                  <MoviePosterCard loading={loading} movieInfo={item} key={index} />
                ))}
          </MainPageSuggestMovieWrapper>
        </div>
      )}
    </div>
  )
}

const MainPageSuggestMovieWrapper = styled.div`
  display: grid;
  gap: 9px 60px;
  justify-content: start;
  flex-direction: column;
  place-items: center;
  padding-left: 20px;
  grid-template-columns: repeat(auto-fill, 180px);
  ${media.small`
    grid-template-columns: repeat(3, 130px);
    gap : 2px;
    padding-left:0px;
  `}
`

const MainPageButtonWrapper = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  padding-right: 20px;
  padding-bottom: 10px;
  ${media.small`
    margin-bottom:10px;
  `};
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

const SpoilerButton = styled.span`
  font-weight: 600;
  color: white;
  cursor: pointer;
`

export default SuggestMovieBox
