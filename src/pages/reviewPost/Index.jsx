import React from 'react'
import { useParams, Outlet } from 'react-router-dom'
import styled from 'styled-components'
import * as S from '@/styles/background'
import useReviewStore from '@/store/reviewStore'
import PostTextReview from './PostTextReview'
import PostPhotoReview from './PostPhotoReview'

const movieData = {
  id: 1,
  image: '/assets/images/movie/poster1.png',
}

function ReviewPostPage() {
  const { movieId } = useParams()
  const reviewStep = useReviewStore((state) => state.reviewStep)

  return (
    <Container $image={movieData.image}>
      <S.BlurOverlay>
        sss
        <Outlet />
        {/* {reviewStep === 1 && <PostTextReview />} */}
        {/* {reviewStep === 2 && <PostPhotoReview />} */}
      </S.BlurOverlay>
    </Container>
  )
}

export default ReviewPostPage

const Container = styled.div`
  background-color: wheat;
  width: 100vw;
  height: 100vh;
  // props.image를 props.$image로 수정
  background: ${(props) => `url(${props.$image})`};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat; // 추가
`
