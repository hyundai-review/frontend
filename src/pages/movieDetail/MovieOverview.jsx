import React from 'react'
import styled from 'styled-components'
function MovieOverview() {
  const summary = '손으로 설렘을 말하고 가슴으로 사랑을 느끼다'
  const contents =
    '대학생활은 끝났지만 하고 싶은 것도, 되고 싶은 것도 없어 고민하던 용준. 엄마의 등쌀에 떠밀려 억지로 도시락 배달 알바를 간  용준은 완벽한 이상형 여름과 마주친다. 부끄러움은 뒷전, 첫눈에 반한 여름에게 용준은 서툴지만 솔직하게 다가가고 여름의 동생  가을은 용준의 용기를 응원한다. 손으로 말하는 여름과 더 가까워지기 위해 더 잘 듣기보단 더 잘 보고 느끼려 노력하지만, 마침내  가까워졌다 생각하던 찰나 여름은 왜인지 자꾸 용준과 멀어지려 하는데…'
  return (
    <>
      <Title>개요</Title>
      <Box>
        <TextWrap>
          <Summary>{summary}</Summary>
          <Contents>{contents}</Contents>
        </TextWrap>
      </Box>
    </>
  )
}

export default MovieOverview

const Title = styled.div`
  color: var(--gray-200, #e4e4e7);
  /* light/lg */
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 200;
  line-height: 30px; /* 150% */
`
const Box = styled.div`
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(0, 0, 0, 0.25);
  display: flex;
  width: 100%;
`
const TextWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
`
const Summary = styled.div`
  color: var(--gray-50, #fafafa);

  /* regular/sm */
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 300;
  line-height: 21px; /* 150% */
`

const Contents = styled.div`
  color: var(--gray-400, #a1a1aa);
  /* regular/sm */
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 21px; /* 150% */
`
