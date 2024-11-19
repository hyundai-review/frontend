import media from '@/styles/media'
import React from 'react'
import Skeleton from 'react-loading-skeleton'
import styled from 'styled-components'
import SkeletonActorCard from './skeleton/SkeletonActorCard'
function ActorCard({ data, loading }) {
  // 배우 목록 앞에 감독 추가
  const actorsWithDirector = [
    {
      img: data?.director?.profile
        ? `https://image.tmdb.org/t/p/w500${data.director.profile}`
        : '/images/default.png', // 감독 프로필이 없을 경우 빈 문자열
      name: data?.director?.name || '감독 정보 없음', // 감독 이름 기본값 설정
      role: '감독',
    },
    ...(data?.actors?.map((actor) => ({
      img: actor?.profile
        ? `https://image.tmdb.org/t/p/w500${actor.profile}`
        : '/images/default.png',
      name: actor?.name || '배우 정보 없음',
      role: actor?.role || '단',
    })) || []),
  ]
  if (loading) {
    return <SkeletonActorCard />
  }
  return (
    <>
      <Wrap>
        <Title>출연진</Title>
        <ActorCardContainer>
          {actorsWithDirector?.map((person, index) => (
            <ActorCardWrap key={index}>
              <ActorImg src={person.img} />
              <TextWrap>
                <ActorName title={person.name}>{person.name}</ActorName>
                <ActorRole title={person.role}>{person.role} 역</ActorRole>
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
  display: grid;
  grid-template-columns: repeat(auto-fill, 130px);
  gap: 10px;
  ${media.medium`
    grid-template-columns: repeat(auto-fill, 90px)
  `}
`

const ActorCardWrap = styled.div`
  width: 120px;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  box-sizing: border-box;
  ${media.medium`
    width:80px;
  `}
`
const TextWrap = styled.div`
  margin-top: 5px;
  padding: 0 10px;
`
const ActorImg = styled.img`
  margin-top: 10px;
  width: 100px;
  height: 125px;
  border-radius: 5px;
  background-size: cover;
  object-fit: cover;
  ${media.medium`
    width: 60px;
    height: 80px;
  `}
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
  margin-bottom: 5px;
`
