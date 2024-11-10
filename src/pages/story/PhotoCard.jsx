import React from 'react'
import styled from 'styled-components'
import HEART from '@/assets/icons/heart.svg?react'
import COMMENT from '@/assets/icons/comment.svg?react'

function PhotoCard({ reviewInfo }) {
  return (
    <Wrap>
      {/* 별점 */}
      <CardWrap>
        <ImgWrap>
          <img src={reviewInfo.photocard} alt='' />
        </ImgWrap>

        <ContentWrap>
          <p>{reviewInfo.content}</p>
          <Tab>
            <CommentWrap>
              <COMMENT />
              <p>{reviewInfo.rating}</p>
            </CommentWrap>
            <HEART />
          </Tab>
        </ContentWrap>
      </CardWrap>
      {/* 초 */}
    </Wrap>
  )
}

export default PhotoCard

const Wrap = styled.div``
const CardWrap = styled.div`
  width: 362px;
  /* height: 710px; */
  flex-shrink: 0;

  border-radius: 9px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(0, 0, 0, 0.3);
`
const ImgWrap = styled.div`
  width: 362px;
  height: 429.75px;
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
  margin: 15px;
  p {
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
    -webkit-line-clamp: 6; // 원하는 줄 수
    -webkit-box-orient: vertical;
    word-break: break-word;
  }
`
const Tab = styled.div`
  margin-top: 50px;
  padding: 0 10px;
  width: 324px;
  height: 40px;
  flex-shrink: 0;

  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(0, 0, 0, 0.5);

  display: flex;
  justify-content: space-between;
  align-items: center;

  p {
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
const CommentWrap = styled.div`
  display: flex;
  align-items: center;
`
