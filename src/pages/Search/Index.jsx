import React, { useCallback, useEffect, useState } from 'react'
import MoviePosterCard from '@/components/moviePosterCard/MoviePosterCard.jsx'
import SearchBar from '@/components/common/SearchBar.jsx'
import media from '@/styles/media'
import styled from 'styled-components'
import { useSearchParams } from 'react-router-dom'
import { nonAuthenticated } from '@/libs/axiosInstance'
import useNavigateStore from '@/store/navigateStore'
import { isLoggedIn } from '@/utils/logInManager'
//TODO(j) axios 한군데 모으기

function SearchPage() {
  const [movieDataArray, setMovieDataArray] = useState([])
  const [searchParams] = useSearchParams()
  const [isLoading, setIsLoading] = useState(false)
  const [checkMoreData, setCheckMoreData] = useState(true)
  const [nowPage, setNowPage] = useState(0)
  const setNavigatePage = useNavigateStore((state) => state.setNowPage)
  const [isLogin, setIsLogin] = useState(isLoggedIn())
  const query = searchParams.get('q') || ''
  const searchWihValue = async (inputValue, page, fetch) => {
    const queryParams = { keyword: inputValue, page: 0, size: 24, fetch: fetch }
    try {
      const getMovieData = await nonAuthenticated.get('/movies/search', {
        params: queryParams,
      })
      //TODO(J) 데이터 없을때를 위한 코드 fetch true로 변경할 것
      if (getMovieData.data.content.length === 0) {
        const getMovieData = searchWihValue(inputValue, 0, false)
      }
      setMovieDataArray(getMovieData.data.content)
    } catch (e) {
      console.log(error)
    }
  }
  const fetchMovies = useCallback(
    async (inputValue, page) => {
      if (isLoading || !checkMoreData) return // 중복 호출 및 더 가져올 데이터 없을 경우 종료
      setIsLoading(true) // 로딩 시작
      const queryParams =
        isLogin === true
          ? { keyword: inputValue, page: page, size: 24, fetch: true }
          : { keyword: inputValue, page: page, size: 24, fetch: false }

      try {
        const getMovieData = await nonAuthenticated.get('/movies/search', {
          params: queryParams,
        })
        const newMovies = getMovieData.data.content
        if (newMovies.length > 0) {
          setMovieDataArray((prev) => [...prev, ...newMovies]) // 기존 데이터에 추가
        }
        setCheckMoreData(newMovies.length === 24) // 데이터가 24개보다 적으면 더 가져올 데이터가 없다고 판단
      } catch (e) {
        console.error(e)
      } finally {
        setIsLoading(false) // 로딩 종료
      }
    },
    [isLoading, checkMoreData], // 필요한 값만 종속성으로 추가
  )
  //네비게이션 페이지 설정
  useEffect(() => {
    setNavigatePage(1)
  }, [setNavigatePage])
  //검색 쿼리 변경되면 첫 페이지 가져오기
  useEffect(() => {
    if (query) {
      setNowPage(0)
      setMovieDataArray([])
      setCheckMoreData(true)
    }
  }, [searchParams])
  useEffect(() => {
    fetchMovies(query, 0)
  }, [checkMoreData, query])
  useEffect(() => {
    setIsLogin(isLoggedIn())
  })
  //화면감지
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
  }, [isLoading, checkMoreData])

  useEffect(() => {
    if (nowPage > 0) {
      fetchMovies(query, nowPage)
    }
  }, [nowPage])

  return (
    <div>
      <SearchPageContainer>
        <SearchBar defaultValue={query} />
        <SearchPageBodyWrapper>
          <SearchPageResultWrapper>
            {query == '' ? '검색어를 입력해주세요' : `"${query}" 에 대한 검색결과`}
          </SearchPageResultWrapper>
          <MoviePosterWrapper>
            {movieDataArray.map((item, index) => (
              <MoviePosterCard movieInfo={item} key={index} />
            ))}
          </MoviePosterWrapper>
          {isLoading && <LoadingIndicator>로딩 중...</LoadingIndicator>}
          {!checkMoreData && nowPage !== 0 && <EndMessage>더 이상 결과가 없습니다.</EndMessage>}
          {!isLoading && nowPage === 0 && movieDataArray.length == 0 && (
            <EndMessage>더 이상 결과가 없습니다.</EndMessage>
          )}
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
  ${media.small`
    padding-top:75px
  `}
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

const LoadingIndicator = styled.div`
  text-align: center;
  margin: 20px 0;
  color: var(--color-gray-300);
`

const EndMessage = styled.div`
  text-align: center;
  margin: 20px 0;
  color: var(--color-gray-400);
`

export default SearchPage
