import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import ReviewComment from './ReviewComment'
import commentWhite from '@/assets/icons/commentWhite.svg'
import comment from '@/assets/icons/comment.svg'
import StarRating from '@/components/common/StarRating'
import { useNavigate } from 'react-router-dom'
import media from '@/styles/media'
import * as S from '@/styles/review/comment.style'
import heart from '@/assets/icons/heart.svg'
import heartActive from '@/assets/icons/heartActive.svg'
import { useApi } from '@/libs/useApi'
import useModalStore from '@/store/modalStore'
function ReviewCard({ review, pageType }) {
  const {
    reviewId,
    rating,
    reviewContent,
    commentCount,
    cardDate,
    photocard,
    authorProfile,
    authorNickname,
    isLike: reviewIsLike,
    isSpoil,
  } = review
  //
  const { post } = useApi(true)
  const { openModal } = useModalStore()
  const navigate = useNavigate()
  const [isCommentOpen, setIsCommentOpen] = useState(false)
  const [isLike, setIsLike] = useState(false)
  const [isSpoiler, setIsSpoiler] = useState(true)
  useEffect(() => {
    console.log('reviewCard >>> ', review)
    console.log('reviewLike >>> ', reviewIsLike)
    setIsSpoiler(isSpoil)
    setIsLike(reviewIsLike)
  }, [review])
  // 함수
  const handleCommentClick = (e) => {
    console.log('댓글 열려라 참깨')
    setIsCommentOpen((prev) => !prev)
    e.stopPropagation()
  }
  const handleLikeClick = (e) => {
    e.stopPropagation()
    if (!isLike) {
      openModal('confirm', { message: '좋아요를 누르시겠습니까?' }, async () => {
        const response = await post(`/reviews/${reviewId}/like`)
        console.log('-----------------------------------------')
        console.log('좋아요 성공:', response)
        setIsLike(true)
      })
    } else {
      openModal('confirm', { message: '좋아요를 취소하시겠습니까?' }, async () => {
        const response = await post(`/reviews/${reviewId}/like`)
        console.log('-----------------------------------------')
        console.log('좋아요 취소 성공:', response)
        setIsLike(false)
      })
    }
  }
  const handleReviewClick = () => {
    // TODO(k) 댓글까지 스크롤 처리 > 영화 상세페이지의 리뷰를 누르면 무슨일이 벌어지지
    if (pageType === 'mypage') {
      navigate(`/movie/${movieId}/detail`)
    }
    return
  }
  const handleSpoiler = (e) => {
    e.stopPropagation()
    setIsSpoiler(false)
  }
  useEffect(() => {
    if (pageType === 'mypage') {
      setIsSpoiler(false)
    }
  }, [pageType])
  return (
    <ReviewCardContainer className='hoverBright' onClick={handleReviewClick}>
      <Wrap>
        {isSpoiler ? (
          <SpoilerWrap>
            <SpoilerText>스포일러가 포함되어 있을 수 있어요.</SpoilerText>
            <SpoilerSubText>
              리뷰를 확인하려면 <SpoilerButton onClick={handleSpoiler}>여기</SpoilerButton>를
              클릭하세요.
            </SpoilerSubText>
          </SpoilerWrap>
        ) : (
          <>
            <LeftWrap>
              <CardHeader>
                {pageType === 'mypage' && <CardMovie>{movieTitle}</CardMovie>}
                {pageType === 'movieDetail' && (
                  <S.CommentWrap>
                    <S.CommentProfileImage src={authorProfile} />
                    <S.CommentNickname>{authorNickname}</S.CommentNickname>
                  </S.CommentWrap>
                )}
                <StarRating type='readonly' initialValue={rating} max={5} size={16} />
              </CardHeader>
              <CardContent>{reviewContent}</CardContent>
            </LeftWrap>
            <RightWrap>
              <Photocard src={photocard} />
            </RightWrap>
          </>
        )}
      </Wrap>
      <CommentWrap>
        <CardFooter>
          <CardCommentWrap>
            <CardCommentLeft>
              <CardCommentIcon
                src={isCommentOpen ? commentWhite : comment}
                $iscommentopen={isCommentOpen}
                onClick={handleCommentClick}
              />
              <CardCommentCount>{commentCount}</CardCommentCount>
            </CardCommentLeft>
            <FooterRightWrap>
              <CardDate>{cardDate.substring(0, 10)}</CardDate>
              {!isLike ? (
                <LikeIcon src={heart} $islike={isLike} onClick={handleLikeClick} />
              ) : (
                <LikeIcon src={heartActive} $islike={isLike} onClick={handleLikeClick} />
              )}
            </FooterRightWrap>
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
// const commentProfileImage =
//   'https://i.pinimg.com/564x/a0/16/57/a01657c023c0c08e4bed3333ffe7421e.jpg'
// const commentNickname = '히무라 켄신'

const ReviewCardContainer = styled.div`
  width: 100%;
  padding: 0 19px;
  padding-top: 19px;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(0, 0, 0, 0.25);
  cursor: pointer;
`
const SpoilerWrap = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 36px;
`
const SpoilerText = styled.div`
  color: var(--gray-400, #a1a1aa);
  text-align: center;

  /* light/md */
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 200;
  line-height: 24px; /* 150% */
  @media (max-width: 413px) {
    font-size: 15px;
  }
`

const SpoilerSubText = styled.div`
  color: var(--gray-400, #a1a1aa);
  text-align: center;

  /* light/sm */
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 200;
  line-height: 21px; /* 150% */
`
const SpoilerButton = styled.span`
  font-weight: 600;
  color: white;
  cursor: pointer;
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
  width: 170px;
  height: 100%;
  border-radius: 5px;
  object-fit: cover;
  ${media.medium`
  width: 100%;
  height: 240px;
`}
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
  ${({ $iscommentopen }) =>
    $iscommentopen && 'filter: drop-shadow(0px 0px 10px var(--primary-light-red, #ffd7d7));'}
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

const LikeIcon = styled.img`
  width: 24px;
  height: 24px;
  cursor: pointer;
  ${({ $islike }) =>
    $islike && 'filter: drop-shadow(0px 0px 10px var(--primary-light-red, #ffd7d7));'}
`
const FooterRightWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`
