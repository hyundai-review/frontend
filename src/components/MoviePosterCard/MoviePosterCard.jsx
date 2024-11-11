import React from 'react'
import * as S from './MoviePosterCard.style'

function MoviePosterCard({ moviePosterUrl, movieId }) {
  return (
    <div>
      <S.StyledMoviePosterCardContainer
        onClick={() => {
          console.log(movieId, '여기에 movie detailpage로 이동')
        }}
      >
        <S.StyledMoviePosterCardImageWrapper>
          <S.StyledMoviePosterCardImage src={`${moviePosterUrl}`} alt='moviePoster' />
        </S.StyledMoviePosterCardImageWrapper>
      </S.StyledMoviePosterCardContainer>
    </div>
  )
}

export default MoviePosterCard
