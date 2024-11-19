import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import HEART from '@/assets/icons/heart.svg?react'
import COMMENT from '@/assets/icons/comment.svg?react'
import StarRating from '@/components/common/StarRating'
import StoryStarRating from '@/components/story/StoryStarRating'
import { ProgressBar } from '@/components/story/ProgressBar'
import useStoryStore from '@/store/storyStore'
import CLOSE from '@/assets/icons/close.svg?react'
import { useNavigate } from 'react-router-dom'
import heart from '@/assets/icons/heart.svg'
import heartActive from '@/assets/icons/heartActive.svg'
import { useApi } from '@/libs/useApi'
import { useCarousel } from '@/libs/useCarousel'

function PhotoCard({ reviewInfo, slideNext, index }) {
  const { focusReview } = useStoryStore()
  const navigate = useNavigate()
  const [isLike, setIsLike] = useState(false)
  const { post } = useApi(true)
  const isCurrentFocus = focusReview?.reviewId === reviewInfo.reviewId
  const { handleSlideClick } = useCarousel(1)

  useEffect(() => {
    setIsLike(reviewInfo.isLike)
  }, [reviewInfo])

  const handleLikeClick = async (e) => {
    e.stopPropagation()
    const response = await post(`/reviews/${reviewInfo.reviewId}/like`)
    console.log('-----------------------------------------')
    console.log('좋아요 성공:', response)
    console.log('like')
    setIsLike((prev) => !prev)
  }
  const handleClose = (e) => {
    e.stopPropagation()
    navigate('/', { replace: true })
  }
  return (
    <Container>
      <div style={{ marginBottom: '10px', marginTop: '10px' }}>
        <StoryStarRating max={reviewInfo.rating} />
      </div>

      {/* <CardWrap onClick={() => handleSlideClick(index, `/movie/${reviewInfo.movieId}/detail`)}> */}
      <CardWrap>
        <ImgWrap>
          <img src={reviewInfo.photocard} alt='' />
        </ImgWrap>

        <ContentWrap>
          <p>{reviewInfo.content}</p>
          <Tab>
            <CommentWrap>
              <COMMENT />
              <span>{reviewInfo.totalComments}</span>
            </CommentWrap>
            {/* <HEART onClick={handleLikeClick} /> */}
            {!isLike ? (
              <LikeIcon src={heart} $islike={isLike} onClick={handleLikeClick} />
            ) : (
              <LikeIcon src={heartActive} $islike={isLike} onClick={handleLikeClick} />
            )}
          </Tab>
        </ContentWrap>
      </CardWrap>
      {isCurrentFocus && (
        <BottomWrap style={{ marginBottom: '10px' }}>
          <ProgressBar slideNext={slideNext} />
          <CloseWrap onClick={handleClose}>
            {/* <CloseWrap onClick={() => navigate('/', { replace: true })}> */}
            <CLOSE />
          </CloseWrap>
        </BottomWrap>
      )}
    </Container>
  )
}

export default PhotoCard

const Container = styled.div`
  width: 362px;
`
const CardWrap = styled.div`
  width: 100%;
  /* height: 710px; */
  flex-shrink: 0;

  border-radius: 9px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(0, 0, 0, 0.3);
`
const ImgWrap = styled.div`
  width: 362px;
  height: 429.75px;
  /* height: 350px; */
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 9px;
  }
`
const ContentWrap = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px;

  p {
    height: 120px;
    color: var(--gray-400, #a1a1aa);
    /* regular/md */
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px; /* 150% */

    // 텍스트 overflow 처리
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 5; // 원하는 줄 수
    -webkit-box-orient: vertical;
    word-break: break-word;
  }
`

const Tab = styled.div`
  margin-top: 10px;
  padding: 0 10px;
  /* width: 324px; */
  width: 100%;
  height: 40px;
  flex-shrink: 0;

  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(0, 0, 0, 0.5);

  display: flex;
  justify-content: space-between;
  align-items: center;
`
const CommentWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  span {
    padding-left: 5px;
    color: var(--gray-50, #fafafa);

    /* regular/sm */
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 21px; /* 150% */
  }
`

const BottomWrap = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
`
const CloseWrap = styled.div`
  display: flex;
  justify-content: center;
`
const LikeIcon = styled.img`
  width: 24px;
  height: 24px;
  cursor: pointer;
  ${({ $islike }) =>
    $islike && 'filter: drop-shadow(0px 0px 10px var(--primary-light-red, #ffd7d7));'}
`
