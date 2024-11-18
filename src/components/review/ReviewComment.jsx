import React, { useRef, useState } from 'react'
import styled, { css } from 'styled-components'
import * as S from '@/styles/review/comment.style'
import Button from '../common/Button'
import { getUserData } from '@/utils/logInManager'
import { useApi } from '@/libs/useApi'

function ReviewComment({ isEdit, commentData, reviewId }) {
  const { post, error } = useApi()
  const userInfo = getUserData()
  //댓글 데이터
  const commentProfileImage = commentData.author.profile
  const commentNickname = commentData.author.nickname
  const commentDate = commentData.createdAt.substring(0, 10)
  const commentContent = commentData.content
  const [isFocused, setIsFocused] = useState(false)
  const inputRef = useRef(null)

  const submitComment = async (commentInput) => {
    const commentData = { content: commentInput }
    console.log(`/comments/${reviewId}`, commentData)
    const response = await post(`/comments/${reviewId}`, commentData)
    if (response.status === 200) {
      alert('답글이 등록되었습니다.')
    }
  }
  const handleClicked = () => {
    if (inputRef.current) {
      console.log(inputRef.current.value)
      submitComment(inputRef.current.value)
    }
  }
  return (
    <>
      {isEdit ? (
        <div style={{ display: 'flex', justifyContent: 'flex-end', flexDirection: 'column' }}>
          <CommentContainer $isfocused={isFocused}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <CommentInput
                ref={inputRef}
                type='text'
                placeholder='답글 추가'
                maxLength={255}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
              />
            </div>
          </CommentContainer>
          {isFocused && (
            <div
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'flex-end',
                marginBottom: '5px',
              }}
            ></div>
          )}
          <Button text={'완료'} onClick={() => handleClicked()} />
        </div>
      ) : (
        <CommentContainer $isfocused={isFocused}>
          <>
            <CommentContent>{commentContent}</CommentContent>
            <CommentFooter>
              <div>
                <S.CommentProfileImage src={commentProfileImage} />
                <S.CommentNickname>{commentNickname}</S.CommentNickname>
              </div>
              <CommentDate>{commentDate}</CommentDate>
            </CommentFooter>
          </>
        </CommentContainer>
      )}
    </>
  )
}

export default ReviewComment

const CommentContainer = styled.div`
  padding: 10px 12px;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(0, 0, 0, 0.25);
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 10px 12px;
  width: 100%;
  ${({ $isfocused }) => $isfocused && focusedStyle}
`
const focusedStyle = css`
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(10px);
  box-shadow: 0 0 15px 5px rgba(255, 255, 255, 0.3);
  transition: 0.5s;
`

const CommentContent = styled.div`
  // color: var(--gray-400, #a1a1aa);
  color: var(--color-gray-50);
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 200;
  line-height: 24px;
`
const CommentFooter = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
  justify-content: space-between;
`
const CommentDate = styled.span`
  color: var(--gray-400, #a1a1aa);
  text-align: right;
  /* regular/xs */
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 18px; /* 150% */
`

const CommentInput = styled.textarea`
  outline: none;
  background-color: transparent;
  border: none;
  color: var(--color-gray-50);
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 200;
  line-height: 24px;
  width: 100%;
  height: 24px;
  vertical-align: top;
  text-align: left;
  resize: none;
  /* cursor: pointer; */
  &:focus {
    height: 82px;
  }
`
