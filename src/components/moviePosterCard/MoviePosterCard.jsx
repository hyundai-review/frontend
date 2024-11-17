import React from 'react'
import media from '@/styles/media'
import styled from 'styled-components'
import OverlayPosterCard from './OverlayPosterCard'
/*moviePosterUrl, movieID */
function MoviePosterCard({ movieInfo }) {
  const moviePosterUrl = `http://image.tmdb.org/t/p/w342${movieInfo.poster}`
  // const moviePosterUrl = `${movieInfo.poster}`
  const movieId = movieInfo.movieId
  const movieTitle = movieInfo.title
  //설명 없으면 설명없다고 텍스트 넣을까?
  const movieTagLine = movieInfo.tagline
  const movieYear = movieInfo.releaseDate.slice(0, 4)
  return (
    <div>
      <MoviePosterCardContainer
        onClick={() => {
          //TODO(j) 영화 디테일 페이지로 이동할것
          console.log(movieId, '여기에 movie detailpage로 이동')
        }}
        className='hoverBright'
      >
        <OverlayPosterCard
          movieTitle={movieTitle}
          movieTagLine={movieTagLine}
          movieYear={movieYear}
        />
        <MoviePosterCardImageWrapper>
          <MoviePosterCardImage src={`${moviePosterUrl}`} alt='moviePoster' />
        </MoviePosterCardImageWrapper>
      </MoviePosterCardContainer>
    </div>
  )
}

const MoviePosterCardContainer = styled.div`
  width: 165px;
  height: 230px;
  box-sizing: content-box;
  background: rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 19px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  ${media.small`
    width:114px;
    height:161px;
    padding-top:5px;
    padding-bottom:5px;
    padding-left:2px;
    padding-right:2px;
    `}
`
const MoviePosterCardImageWrapper = styled.div`
  width: 154px;
  height: 220px;
  ${media.small`
    width: 92px;
    height: 132px
  `}
`
const MoviePosterCardImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 5px;
  object-fit: cover;
`

export default MoviePosterCard
