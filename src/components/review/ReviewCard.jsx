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
    movieId,
    reviewId,
    movieTitle,
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
  const { get, error } = useApi()
  const navigate = useNavigate()
  const [isCommentOpen, setIsCommentOpen] = useState(false)
  const [isLike, setIsLike] = useState(false)
  const [isSpoiler, setIsSpoiler] = useState(true)
  const [commentList, setCommentList] = useState([])
  const [fetchData, setFetchData] = useState(false)
  const fetchCommentData = async () => {
    try {
      const response = await get(`/comments/${review.reviewId}`)
      setCommentList(response.data.comments)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    setIsSpoiler(isSpoil)
    setIsLike(reviewIsLike)
    if (pageType === 'mypage') {
      setIsSpoiler(false)
    }
  }, [review, pageType])
  // 함수
  const handleCommentClick = (e) => {
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
    // TODO(k) 댓글까지 스크롤 처리 가능?
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

  useEffect(() => {
    setCommentList(commentList)
    console.log(commentList)
    console.log('1')
  }, [commentList])

  useEffect(() => {
    fetchCommentData()
    setCommentList(commentList)
    console.log(commentList)
    console.log('2')
  }, [isCommentOpen, fetchData, setFetchData])

  // const handleComment = () => {
  //   setFetchData((prev) => !prev)
  // }
  // useEffect(() => {
  //   const fetchCommentData = async () => {
  //     try {
  //       const response = await get(`/comments/${review.reviewdId}`)
  //       setCommentList(response.data.comments)
  //       console.log(commentList)
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   }
  //   fetchCommentData()
  // }, [isCommentOpen])
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
            {photocard && (
              <RightWrap>
                <Photocard src={photocard} />
              </RightWrap>
            )}
          </>
        )}
      </Wrap>
      <CommentWrap>
        <CardFooter>
          <CardCommentWrap>
            <CardCommentLeft onClick={handleCommentClick}>
              <CardCommentIcon
                src={isCommentOpen ? commentWhite : comment}
                $iscommentopen={isCommentOpen}
              />
              <CardCommentCount>{commentList.length}</CardCommentCount>
            </CardCommentLeft>
            <FooterRightWrap>
              <CardDate>{cardDate.substring(0, 10)}</CardDate>
              {pageType === 'movieDetail' &&
                (!isLike ? (
                  <LikeIcon src={heart} $islike={isLike} onClick={handleLikeClick} />
                ) : (
                  <LikeIcon src={heartActive} $islike={isLike} onClick={handleLikeClick} />
                ))}
            </FooterRightWrap>
          </CardCommentWrap>
        </CardFooter>
        {isCommentOpen && (
          <>
            {commentList?.map((item, index) => (
              <ReviewComment
                isEdit={false}
                commentData={item}
                reviewId={review.reviewId}
                key={index}
                setFetchData={setFetchData}
              />
            ))}
            <ReviewComment isEdit={true} reviewId={review.reviewId} setFetchData={setFetchData} />
          </>
        )}
      </CommentWrap>
    </ReviewCardContainer>
  )
}

export default ReviewCard

const ReviewCardContainer = styled.div`
  width: 100%;
  padding: 0 19px;
  padding-top: 19px;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(0, 0, 0, 0.25);
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
  cursor: pointer;
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
