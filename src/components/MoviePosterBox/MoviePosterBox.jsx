import React from 'react'
import * as S from './MoviePosterBox.style'

function MoviePosterBox({ moviePosterUrl, movieId }) {
  return (
    <div>
      <S.StyledMoviePosterBoxContainer
        onClick={() => {
          console.log(movieId, '여기에 movie detailpage로 이동')
        }}
      >
        <S.StyledMoviePosterBoxImageWrapper>
          <S.StyledMoviePosterBoxImage src={`${moviePosterUrl}`} alt='moviePoster' />
        </S.StyledMoviePosterBoxImageWrapper>
      </S.StyledMoviePosterBoxContainer>
    </div>
  )
}

export default MoviePosterBox
