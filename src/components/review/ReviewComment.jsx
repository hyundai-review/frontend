import React, { useEffect, useRef, useState } from 'react'
import styled, { css } from 'styled-components'
import * as S from '@/styles/review/comment.style'
import Button from '../common/Button'
import { getUserData } from '@/utils/logInManager'
import { useApi } from '@/libs/useApi'
import edit from '@/assets/icons/edit.svg'
import trash from '@/assets/icons/trash.svg'
import useModalStore from '@/store/modalStore'

function ReviewComment({ isEdit, commentData, reviewId, setFetchData }) {
  const { post, put, delete: remove, error } = useApi()
  const { openModal } = useModalStore()
  const userInfo = getUserData()
  //댓글 데이터
  const [commentId, setCommentId] = useState(isEdit ? '' : commentData.commentId)
  const [commentProfileImage, setCommentProfileImage] = useState(
    isEdit ? '' : commentData.author.profile,
  )
  const [commentNickname, setCommentNickname] = useState(isEdit ? '' : commentData.author.nickname)
  const [commentDate, setCommentDate] = useState(
    isEdit ? '' : commentData.createdAt.substring(0, 10),
  )
  const [commentContent, setCommentContent] = useState(isEdit ? '' : commentData.content)
  const [isFocused, setIsFocused] = useState(false)
  const [isEdited, setIsEdited] = useState(isEdit)
  const [isModified, setIsModified] = useState(false)
  const [autoPlay, setAutoPlay] = useState(false)
  // const [inputValue, setInputValue] = useState('')
  const inputRef = useRef(null)

  const submitComment = async (commentInput) => {
    const commentData = { content: commentInput }
    const response = await post(`/comments/${reviewId}`, commentData)
    setFetchData((prev) => !prev)
  }
  const modifyComment = async (commentInput) => {
    const commentData = { content: commentInput }
    const response = await put(`/comments/${commentId}`, commentData)

    setFetchData((prev) => !prev)
  }
  const deleteComment = async () => {
    const response = await remove(`/comments/${commentId}`)
    setFetchData((prev) => !prev)
  }

  const handleClicked = () => {
    const inputValue = inputRef.current.value
    if (inputRef.current) {
      inputRef.current.blur()
      //댓글 처음 등록일 떄
      if (isModified == false) {
        openModal('confirm', { message: '댓글을 등록하시겠습니까?' }, () => {
          submitComment(inputValue)
          setIsFocused(false)
          setIsEdited(true)
          // reloadData()
        })
      } else {
        //댓글 수정할 때
        openModal('confirm', { message: '댓글을 수정하시겠습니까?' }, () => {
          modifyComment(inputValue)
          setIsFocused(false)
          setIsEdited(false)
          setCommentContent(inputValue)
          // reloadData()
        })

        setIsEdited(false)
      }
    }
    setIsFocused(false)
    inputRef.current.value = ''
  }
  const handleDelete = async () => {
    openModal('confirm', { message: '댓글을 삭제하시겠습니까?' }, () => {
      deleteComment()
      setIsFocused(false)
      // reloadData()
    })
  }
  return (
    <>
      {isEdited ? (
        <div style={{ display: 'flex', justifyContent: 'flex-end', flexDirection: 'column' }}>
          <CommentContainer $isfocused={isFocused}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <CommentInput
                ref={inputRef}
                type='text'
                placeholder='답글 추가'
                maxLength={255}
                onFocus={() => setIsFocused(true)}
                onBlur={() => handleClicked()}
                defaultValue={commentContent}
                autoFocus={autoPlay}
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
            >
              <Button
                text={'완료'}
                onClick={() => {
                  handleClicked()
                  setAutoPlay(false)
                }}
              />
            </div>
          )}
        </div>
      ) : (
        <CommentContainer $isfocused={isFocused}>
          <>
            <CommentContent>{commentContent}</CommentContent>
            <CommentFooter>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <S.CommentProfileImage src={commentProfileImage} />
                  <S.CommentNickname>{commentNickname}</S.CommentNickname>
                </div>
                <CommentDate>{commentDate}</CommentDate>
              </div>

              <div>
                <Icon
                  src={edit}
                  onClick={() => {
                    setIsEdited(true)
                    setIsFocused(true)
                    setAutoPlay(true)
                    setIsModified(true)
                  }}
                />
                <Icon
                  src={trash}
                  onClick={() => {
                    handleDelete()
                  }}
                />
              </div>
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
