import React, { useState } from 'react'
// import StarRating from './StarRating'
import styled from 'styled-components'
import ReviewComment from './ReviewComment'
import commentWhite from '@/assets/icons/commentWhite.svg'
import comment from '@/assets/icons/comment.svg'
import StarRating from '@/components/common/StarRating'
import { useNavigate } from 'react-router-dom'
function ReviewCard({ review }) {
  const { movieId, movieTitle, rating, reviewContent, commentCount, cardDate } = review
  const navigate = useNavigate()
  const [isCommentOpen, setIsCommentOpen] = useState(false)
  const handleCommentClick = (e) => {
    console.log('댓글 열려라 참깨')
    setIsCommentOpen((prev) => !prev)
    e.stopPropagation()
  }
  const handleReviewClick = () => {
    // TODO(k) 댓글까지 스크롤 처리
    navigate(`/movie/${movieId}/detail`)
  }
  return (
    <ReviewCardContainer className='hoverBright' onClick={handleReviewClick}>
      <Wrap>
        <LeftWrap>
          <CardHeader>
            <CardMovie>{movieTitle}</CardMovie>
            <StarRating type='readonly' initialValue={rating} max={5} size={16} />
          </CardHeader>
          <CardContent>{reviewContent}</CardContent>
        </LeftWrap>
        <RightWrap>
          <Photocard src={review.photocard} />
        </RightWrap>
      </Wrap>
      <CommentWrap>
        <CardFooter>
          <CardCommentWrap>
            <CardCommentLeft>
              <CardCommentIcon
                src={isCommentOpen ? commentWhite : comment}
                isCommentOpen={isCommentOpen}
                onClick={handleCommentClick}
              />
              <CardCommentCount>{commentCount}</CardCommentCount>
            </CardCommentLeft>
            <CardDate>{cardDate.substring(0, 10)}</CardDate>
          </CardCommentWrap>
        </CardFooter>
        {isCommentOpen && (
          <>
            <ReviewComment />
            <ReviewComment />
          </>
        )}
      </CommentWrap>
    </ReviewCardContainer>
  )
}

export default ReviewCard

const ReviewCardContainer = styled.div`
  width: 100%;
  padding: 19px;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(0, 0, 0, 0.25);
  cursor: pointer;
`
const Wrap = styled.div`
  display: flex;
  justify-content: space-between;
`

const LeftWrap = styled.div`
  margin-right: 20px;
`
const CardHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  margin-bottom: 8px;
  gap: 5px;
`

const CardMovie = styled.span`
  color: var(--gray-50, #fafafa);
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 21px; /* 150% */
`
const CardContent = styled.div`
  color: var(--gray-400, #a1a1aa);
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  // margin-bottom: 10px;
  margin: 10px 0;
`

const CardFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
  cursor: default;
`

const RightWrap = styled.div``

const Photocard = styled.img`
  width: 160px;
  height: 160px;
  border-radius: 5px;
  object-fit: cover;
`
const CardCommentWrap = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(0, 0, 0, 0.25);
  padding: 10px;
  margin-bottom: 10px;
`
const CardCommentLeft = styled.div`
  display: flex;
  align-items: center;
`
const CardComment = styled.span`
  /* font-size: 14px;
  font-weight: 400;
  color: #fafafa;
  margin-right: 10px; */
`
const CardDate = styled.span`
  color: var(--gray-400, #a1a1aa);
  /* regular/xs */
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 18px; /* 150% */
`
const CardCommentIcon = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 5px;
  cursor: pointer;
  ${({ isCommentOpen }) =>
    isCommentOpen && 'filter: drop-shadow(0px 0px 10px var(--primary-light-red, #ffd7d7));'}
`
const CardCommentCount = styled.span`
  color: var(--gray-50, #fafafa);
  /* regular/sm */
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 21px; /* 150% */
`
const CommentWrap = styled.div``
