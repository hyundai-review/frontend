import React from 'react'
import styled from 'styled-components'
function ReviewComment() {
  const commentContent = '댓글 내용입니다.'
  const commentProfileImage =
    'https://i.pinimg.com/564x/a0/16/57/a01657c023c0c08e4bed3333ffe7421e.jpg'
  const commentNickname = '히무라 켄신'
  const commentDate = '2024.11.09'

  return (
    <CommentContainer>
      <CommentContent>{commentContent}</CommentContent>
      <CommentFooter>
        <CommentProfileImage src={commentProfileImage} />
        <CommentNickname>{commentNickname}</CommentNickname>
        <CommentDate>{commentDate}</CommentDate>
      </CommentFooter>
    </CommentContainer>
  )
}

export default ReviewComment

export const CommentContainer = styled.div`
  padding: 10px 12px;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(0, 0, 0, 0.25);
  margin-bottom: 10px;
`

export const CommentContent = styled.div`
  // color: var(--gray-400, #a1a1aa);
  color: #fafafa;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  margin-bottom: 10px;
`
export const CommentFooter = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
`
export const CommentProfileImage = styled.img`
  width: 20px;
  height: 20px;
  border-radius: 16px;
  margin-right: 10px;
`
export const CommentNickname = styled.span`
  color: var(--gray-400, #a1a1aa);
  text-align: right;
  /* regular/xs */
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 18px; /* 150% */
  margin-right: 4px;
`
export const CommentDate = styled.span`
  color: var(--gray-400, #a1a1aa);
  text-align: right;
  /* regular/xs */
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 18px; /* 150% */
`
