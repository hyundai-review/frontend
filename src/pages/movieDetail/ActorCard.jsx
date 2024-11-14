import React from 'react'
import styled from 'styled-components'
import { Rating } from '@mui/material'
function ActorCard({ data }) {
  return (
    <>
      <Wrap>
        <Title>출연진</Title>
        <ActorCardContainer>
          {data.map((data, index) => (
            <ActorCardWrap key={index}>
              <ActorImg src={data.img} />
              <TextWrap>
                <ActorName title={data.name}>{data.name}</ActorName>
                <ActorRole title={data.role}>{data.role} 역</ActorRole>
              </TextWrap>
            </ActorCardWrap>
          ))}
        </ActorCardContainer>
      </Wrap>
    </>
  )
}

export default ActorCard
const Wrap = styled.div`
  margin-top: 20px;
`
const Title = styled.div`
  color: var(--gray-200, #e4e4e7);
  /* light/lg */
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 200;
  line-height: 30px; /* 150% */
  margin-bottom: 10px;
`
const ActorCardContainer = styled.div`
  display: flex;
  gap: 10px;
`

const ActorCardWrap = styled.div`
  width: 80px;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  box-sizing: border-box;
`
const TextWrap = styled.div`
  padding: 0 10px;
`
const ActorImg = styled.img`
  margin-top: 10px;
  width: 60px;
  height: 80px;
  border-radius: 5px;
  background-size: cover;
  object-fit: cover;
`

const ActorName = styled.div`
  color: var(--gray-50, #fafafa);
  text-align: center;
  /* regular/sm */
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 21px; /* 150% */
  /* 2줄 이상일 경우 '...'으로 생략 */
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2; /* 최대 2줄 */
  overflow: hidden;
  text-overflow: ellipsis;
`

const ActorRole = styled.div`
  color: var(--gray-400, #a1a1aa);
  text-align: center;

  /* light/xs */
  font-family: Pretendard;
  font-size: 10px;
  font-style: normal;
  font-weight: 200;
  line-height: 18px; /* 150% */
  /* 2줄 이상일 경우 '...'으로 생략 */
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2; /* 최대 2줄 */
  overflow: hidden;
  text-overflow: ellipsis;
`
