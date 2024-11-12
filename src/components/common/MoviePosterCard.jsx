import React from 'react'
import media from '@/styles/media'
import styled from 'styled-components'

/*moviePosterUrl, movieID */
function MoviePosterCard({ moviePosterUrl, movieId }) {
  return (
    <div>
      <MoviePosterCardContainer
        onClick={() => {
          console.log(movieId, '여기에 movie detailpage로 이동')
        }}
      >
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
    padding:5px`}
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
  object-fit: cover;
`

export default MoviePosterCard
