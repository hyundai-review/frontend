import React, { useState } from 'react'
// import StarRating from './StarRating'
import styled from 'styled-components'
import ReviewComment from './ReviewComment'
import commentWhite from '@/assets/icons/commentWhite.svg'
import comment from '@/assets/icons/comment.svg'
import StarRating from '@/components/common/StarRating'
import ReviewStarRating from './ReviewStarRating'
function ReviewCard() {
  // temp data
  const reviewContent =
    '이 영화는 정말 재밌었어요! 이 영화는 정말 재밌었어요! 이 영화는 정말 재밌었어요! 이 영화는 정말 재밌었어요! 이 영화는 정말 재밌었어요!'
  const commentCount = 13
  const cardDate = '2024.11.09'
  const rating = 4 // 별점
  const movie = '청설'

  const [isCommentOpen, setIsCommentOpen] = useState(false)
  const handleIconClick = () => {
    console.log('댓글 열려라 참깨')
    setIsCommentOpen((prev) => !prev)
  }
  const [initrating, setRating] = useState(3) // 별점 초기값을 3으로 설정

  const handleRatingChange = (newRating) => {
    setRating(newRating) // 별점 변경 시 상태 업데이트
  }
  return (
    <ReviewCardContainer>
      <CardHeader>
        <StarRating type='readonly' initialValue={rating} max={5} size={16} />
        <StarRating
          type='controlled' // 'controlled' 모드로 설정
          initialValue={initrating} // 초기 별점 값으로 상태 값 전달
          onChange={handleRatingChange} // 별점이 변경될 때 실행할 함수
          size={16} // 아이콘 크기를 24px로 설정
          max={5} // 최대 별점 5개 설정
        />
        <CardMovie>{movie}</CardMovie>
      </CardHeader>
      <CardContent>{reviewContent}</CardContent>
      <CardFooter>
        <CardCommentWrap>
          <CardCommentLeft>
            <CardCommentIcon
              src={isCommentOpen ? commentWhite : comment}
              isCommentOpen={isCommentOpen}
              onClick={handleIconClick}
            />
            <CardCommentCount>{commentCount}</CardCommentCount>
          </CardCommentLeft>
          <CardDate>{cardDate}</CardDate>
        </CardCommentWrap>
      </CardFooter>
      {isCommentOpen && (
        <>
          <ReviewComment />
          <ReviewComment />
        </>
      )}
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
`
const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
`

const CardMovie = styled.span`
  color: var(--gray-50, #fafafa);
  text-align: right;
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
  margin-bottom: 10px;
`
const CardFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
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
  font-size: 14px;
  font-weight: 400;
  color: #fafafa;
  margin-right: 10px;
`
const CardDate = styled.span`
  color: var(--gray-400, #a1a1aa);
  text-align: right;
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
