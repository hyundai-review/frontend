import React from 'react'
import styled from 'styled-components'
function MovieReview() {
  const reviewCount = 123
  return (
    <Wrap>
      <Title>리뷰({reviewCount})</Title>
      <Box>
        <TextWrap>
          <Text>
            <BoldText>회원가입</BoldText>을 통해 리뷰를 확인하세요
          </Text>
        </TextWrap>
      </Box>
    </Wrap>
  )
}

export default MovieReview
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
const Box = styled.div`
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(0, 0, 0, 0.25);
  display: flex;
  width: 100%;
  height: 100px;
`
const TextWrap = styled.div`
  margin: 0 auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const Text = styled.div`
  color: var(--gray-50, #fafafa);
  text-align: center;

  /* light/md */
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 200;
  line-height: 24px; /* 150% */
`
const BoldText = styled.span`
  font-weight: 700;
`
