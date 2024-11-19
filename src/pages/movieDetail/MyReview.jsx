import React, { useEffect, useRef, useState } from 'react'
// import StarRating from './StarRating'
import styled from 'styled-components'
import commentWhite from '@/assets/icons/commentWhite.svg'
import comment from '@/assets/icons/comment.svg'
import StarRating from '@/components/common/StarRating'
import media from '@/styles/media'
import * as S from '@/styles/review/comment.style'
import ReviewComment from '@/components/review/ReviewComment'
import edit from '@/assets/icons/edit.svg'
import trash from '@/assets/icons/trash.svg'
import SearchBar from '@/components/common/SearchBar'
import * as SText from '@/styles/text'
import { Checkbox } from '@mui/material'
import { useApi } from '@/libs/useApi'
import useModalStore from '@/store/modalStore'
import { validateReviewForm } from '@/utils/myReviewHandlers'
// import { review } from '@/assets/data/myReviewData'
function MyReview({ myReviewData = {}, onDataChange }) {
  // ----------data----------
  const {
    reviewId = 0,
    rating: reviewRating = 0,
    content: reviewContent = '작성된 리뷰가 없습니다.',
    photocard = null,
    updatedAt = '정보 없음',
    totalComments = 0,
    isSpoil: reviewIsSpoil = false,
  } = myReviewData
  // ----------API----------
  const { put, get, delete: deleteReview } = useApi(true)
  const { openModal } = useModalStore()
  // ---------- State ----------
  const [isCommentOpen, setIsCommentOpen] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [isDelete, setIsDelete] = useState(false)
  const [isSpoil, setIsSpoil] = useState(false)
  const [content, setContent] = useState('')
  const [rating, setRating] = useState(0)
  const [commentList, setCommentList] = useState([])
  const [fetchData, setFetchData] = useState(false)
  const formRef = useRef({ isSpoil, rating, content })
  useEffect(() => {
    if (myReviewData) {
      // console.log('myReviewData >>> ', myReviewData)
      setRating(reviewRating)
      setContent(reviewContent)
      setIsSpoil(reviewIsSpoil)
      formRef.current.rating = reviewRating
      formRef.current.content = reviewContent
      formRef.current.isSpoil = reviewIsSpoil
    }
    console.log(myReviewData)
  }, [myReviewData])
  useEffect(() => {
    fetchCommentData()
    setCommentList(commentList)
  }, [isCommentOpen, fetchData, setFetchData])
  useEffect(() => {
    setCommentList(commentList)
  }, [commentList])
  // // 함수
  const handleCheckboxChange = (e) => {
    const checked = e.target.checked
    formRef.current.isSpoil = checked // Ref 업데이트
    setIsSpoil(checked) // 상태 업데이트
  }
  const handleRatingChange = (newRating) => {
    setRating(newRating) // 별점 상태 업데이트
    formRef.current.rating = newRating // 폼 데이터 업데이트
  }
  const handleEditClick = (e) => {
    e.stopPropagation()
    console.log('편집 열려라 참깨 : ', isEdit)
    const formData = {
      rating: formRef.current.rating,
      content: formRef.current.content,
      isSpoil: formRef.current.isSpoil,
    }
    if (isEdit) {
      // 제출 클릭
      // 유효성 검사 호출
      console.log('제출된 데이터 : ', formData) // 제출 데이터 확인
      const isValid = validateReviewForm(formData, openModal)
      if (!isValid) return
      openModal('confirm', { message: '수정하시겠습니까?' }, async () => {
        const response = await put(`/reviews/${reviewId}`, formData)
        console.log('-----------------------------------------')
        console.log('수정 성공:', response)
        setIsEdit(false) // 편집 모드 종료
      })
      return
    } else {
      setIsEdit(true)
    }
  }
  const fetchCommentData = async () => {
    try {
      const response = await get(`/comments/${reviewId}`)
      setCommentList(response.data.comments)
    } catch (error) {
      console.log(error)
    }
  }

  const handleCommentClick = (e) => {
    console.log('댓글 열려라 참깨')
    setIsCommentOpen(true)
    e.stopPropagation()
  }
  const handleDeleteClick = (e) => {
    e.stopPropagation()
    openModal('confirm', { message: '삭제하시겠습니까?' }, async () => {
      try {
        const response = await deleteReview(`/reviews/${reviewId}`)
        console.log('삭제 성공:', response)
        onDataChange() // 부모에게 데이터 갱신 요청
      } catch (error) {
        console.error('삭제 실패:', error)
      }
    })
  }
  // 리뷰 내용 변경
  const handleContentChange = (e) => {
    setContent(e.target.value) // 내용 상태 업데이트
    formRef.current.content = e.target.value // 폼 데이터 업데이트
  }
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
              <EditContents>
                <IconWrap>
                  <StarRating
                    type='controlled'
                    initialValue={rating}
                    onChange={handleRatingChange}
                    size={16}
                    max={5}
                  />
                </IconWrap>
                <SpoWrap>
                  <SText.Text>스포일러가 포함되어 있나요?</SText.Text>
                  <Checkbox
                    checked={isSpoil}
                    onChange={handleCheckboxChange}
                    disableRipple // 애니 효과 제거
                    sx={{
                      padding: '0',
                      color: 'var(--color-gray-50)',
                      filter: 'drop-shadow(0px 0px 10px var(--primary-light-red, #ffd7d7))',
                      width: '10px',

                      '&.Mui-checked': {
                        color: 'var(--color-gray-50)',
                      },
                      '& .MuiSvgIcon-root': {},
                    }}
                  />
                </SpoWrap>
              </EditContents>
              <EditInput type='text' value={content} onChange={handleContentChange} />
            </EditWrap>
          ) : (
            <>
              <EditContents>
                <StarRating type='readonly' initialValue={rating} max={5} size={16} />
                <SpoWrap>
                  <SText.Text>스포</SText.Text>
                  <Checkbox
                    // defaultChecked={!isSpoil}
                    checked={isSpoil}
                    disableRipple // 애니 효과 제거
                    disabled // 체크박스를 읽기 전용으로 설정
                    sx={{
                      padding: '0',
                      color: 'var(--color-gray-50)',
                      filter: 'drop-shadow(0px 0px 10px var(--primary-light-red, #ffd7d7))',
                      width: '10px',
                      '&.Mui-checked': {
                        color: 'var(--color-gray-50)',
                      },
                      '&.Mui-disabled': {
                        opacity: 1, // disabled 상태에서도 가시성을 유지
                        color: 'var(--color-gray-50)',
                      },
                    }}
                  />
                </SpoWrap>
              </EditContents>
              <CardContent>{content}</CardContent>
            </>
          )}
        </LeftWrap>
        {photocard && (
          <RightWrap>
            <Photocard src={photocard} />
          </RightWrap>
        )}
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
              <CardCommentCount>{commentList.length}</CardCommentCount>
            </CardCommentLeft>
            <CardCommentRight>
              <CardDate>{updatedAt.slice(0, 10)}</CardDate>
              <Icon src={edit} $isedit={isEdit} onClick={handleEditClick} />
              <Icon src={trash} $isdelete={isDelete} onClick={handleDeleteClick} />
            </CardCommentRight>
          </CardCommentWrap>
        </CardFooter>
        {isCommentOpen && (
          <>
            {
              /*TODO(j) 댓글 불러와서 연동하기 */
              commentList?.map((item, index) => (
                <ReviewComment
                  isEdit={false}
                  commentData={item}
                  reviewId={reviewId}
                  key={index}
                  setFetchData={setFetchData}
                />
              ))
            }
            <ReviewComment isEdit={true} reviewId={reviewId} setFetchData={setFetchData} />
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
  /* margin-bottom: 5px; */
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
  gap : 10px;
`}
  justify-content: space-between;
`

const LeftWrap = styled.div`
  flex: 1;
  padding-right: 10px;
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
  width: 250px;
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
const Icon = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 5px;
  cursor: pointer;
  ${({ $iscommentopen }) =>
    $iscommentopen && 'filter: drop-shadow(0px 0px 10px var(--primary-light-red, #ffd7d7));'}
  ${({ $isedit }) =>
    $isedit &&
    `
      filter: 
        drop-shadow(0px 0px 5px var(--primary-light-red, #ffd7d7)) 
        brightness(1.2) 
        contrast(1.5);
      box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2); /* 부드러운 그림자 추가 */
    `};
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
  border-radius: 5px;
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
  padding: 10px;
`

const EditWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  height: 85%;
  gap: 10px;
`
const EditContents = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 5px;
`
const SpoWrap = styled.div`
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
`
const IconWrap = styled.div`
  margin-bottom: 4px;
`
