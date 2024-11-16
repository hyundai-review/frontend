import React, { useEffect, useState } from 'react'
// import StarRating from './StarRating'
import styled from 'styled-components'
import commentWhite from '@/assets/icons/commentWhite.svg'
import comment from '@/assets/icons/comment.svg'
import StarRating from '@/components/common/StarRating'
import { useNavigate } from 'react-router-dom'
import media from '@/styles/media'
import * as S from '@/styles/review/comment.style'
import ReviewComment from '@/components/review/ReviewComment'
import edit from '@/assets/icons/edit.svg'
import trash from '@/assets/icons/trash.svg'
import SearchBar from '@/components/common/SearchBar'
const review = {
  movieId: 1,
  movieTitle: '명탐정 코난-시한장치의 마천루',
  reviewId: 101,
  rating: 5,
  reviewContent: '5월 3일 토요일 밤 10시! 베이카 시네마 로비에서 만나는 거다! 잊지 마!',
  photocard: 'https://img.cgv.co.kr/Movie/Thumbnail/Poster/000088/88769/88769_320.jpg',
  totalComments: 12,
  createdAt: '2023-11-01T12:00:00Z',
  updatedAt: '2023-11-02T10:00:00Z',
}
function MyReview() {
  const { movieId, movieTitle, rating, reviewContent, totalComments, createdAt } = review
  const navigate = useNavigate()
  const [isCommentOpen, setIsCommentOpen] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [isDelete, setIsDelete] = useState(false)
  const [content, setContent] = useState(reviewContent)
  const [initrating, setRating] = useState(3)
  const handleRatingChange = (newRating) => {
    setRating(newRating) // 별점 변경 시 상태 업데이트
  }

  // 함수
  const handleCommentClick = (e) => {
    console.log('댓글 열려라 참깨')
    setIsCommentOpen((prev) => !prev)
    e.stopPropagation()
  }
  const handleEditClick = (e) => {
    console.log('편집 열려라 참깨')
    setIsEdit((prev) => !prev)
    e.stopPropagation()
  }
  const handleDeleteClick = (e) => {
    alert('삭제하시겠습니까?')
    setIsDelete((prev) => !prev)
    e.stopPropagation()
  }
  const handleContentChange = (e) => setContent(e.target.value)
  return (
    <Container>
      <Wrap>
        <LeftWrap>
          <CardHeader>
            <TitleWrap>
              <Title>내 리뷰</Title>
            </TitleWrap>
          </CardHeader>
          {isEdit ? (
            <EditWrap>
              <StarRating
                type='controlled'
                initialValue={initrating}
                onChange={handleRatingChange}
                size={16}
                max={5}
              />
              <EditInput type='text' value={content} onChange={handleContentChange} />
            </EditWrap>
          ) : (
            <>
              <StarRating type='readonly' initialValue={rating} max={5} size={16} />
              <CardContent>{content}</CardContent>
            </>
          )}
        </LeftWrap>
        <RightWrap>
          <Photocard src={review.photocard} />
        </RightWrap>
      </Wrap>
      <CommentWrap>
        <CardFooter>
          <CardCommentWrap>
            <CardCommentLeft>
              <Icon
                src={isCommentOpen ? commentWhite : comment}
                $iscommentopen={isCommentOpen}
                onClick={handleCommentClick}
              />
              <CardCommentCount>{totalComments}</CardCommentCount>
            </CardCommentLeft>
            <CardCommentRight>
              <CardDate>{createdAt.substring(0, 10)}</CardDate>
              <Icon src={edit} $isedit={isEdit} onClick={handleEditClick} />
              <Icon src={trash} $isdelete={isDelete} onClick={handleDeleteClick} />
            </CardCommentRight>
          </CardCommentWrap>
        </CardFooter>
        {isCommentOpen && (
          <>
            <ReviewComment />
            <ReviewComment />
          </>
        )}
      </CommentWrap>
    </Container>
  )
}

export default MyReview

const TitleWrap = styled.div`
  border-radius: 5px;
  border: 1px solid #b6b5ff;
  background: rgba(0, 0, 0, 0.1);
  box-shadow: 0px 0px 10px 0px var(--primary-solid-light, rgba(199, 125, 181, 0.5));
  padding: 2px 8px;
  margin-bottom: 5px;
`
const Title = styled.div`
  text-align: center;
  text-shadow: 0px 0px 10px var(--primary-solid, #c77db5);

  /* regular/xs */
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 18px; /* 150% */
  background: linear-gradient(91deg, #b6b5ff 0%, #ffd7d7 99.7%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`
const Container = styled.div`
  width: 100%;
  padding: 5px 19px;
`
const Wrap = styled.div`
  display: flex;
  ${media.medium`
  flex-direction: column;
`}
  justify-content: space-between;
`

const LeftWrap = styled.div`
  margin-right: 20px;
  flex: 1;
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
  width: 100%;
  height: 240px;
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
const Icon = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 5px;
  cursor: pointer;
  ${({ $iscommentopen }) =>
    $iscommentopen && 'filter: drop-shadow(0px 0px 10px var(--primary-light-red, #ffd7d7));'}
  ${({ $isedit }) =>
    $isedit && 'filter: drop-shadow(0px 0px 10px var(--primary-light-red, #ffd7d7));'}
      ${({ $isdelete }) =>
    $isdelete && 'filter: drop-shadow(0px 0px 10px var(--primary-light-red, #ffd7d7));'}
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

const CardCommentRight = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`
const EditInput = styled.textarea`
  outline: none;
  background-color: transparent;
  border: none;
  color: var(--gray-400, #a1a1aa);
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  width: 100%;
  height: 100%;
  vertical-align: top;
  text-align: left;
  resize: none;
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(10px);
  box-shadow: 0 0 15px 5px rgba(255, 255, 255, 0.3);
`

const EditWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  height: 205px;
  ${media.medium`
  height:86px;
`}
`
