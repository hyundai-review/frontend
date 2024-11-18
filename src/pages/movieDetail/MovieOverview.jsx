import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import down from '@/assets/icons/down.svg'
import up from '@/assets/icons/up.svg'
function MovieOverview({ data }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isOverflowing, setIsOverflowing] = useState(false)
  const contentsRef = useRef(null)

  const summary = data?.tagline
  const contents = data?.overview

  // const summary = '손으로 설렘을 말하고 가슴으로 사랑을 느끼다'
  // const contents =
  //   '대학생활은 끝났지만 하고 싶은 것도, 되고 싶은 것도 없어 고민하던 용준. 엄마의 등쌀에 떠밀려 억지로 도시락 배달 알바를 간  용준은 완벽한 이상형 여름과 마주친다. 부끄러움은 뒷전, 첫눈에 반한 여름에게 용준은 서툴지만 솔직하게 다가가고 여름의 동생  가을은 용준의 용기를 응원한다. 손으로 말하는 여름과 더 가까워지기 위해 더 잘 듣기보단 더 잘 보고 느끼려 노력하지만, 마침내  가까워졌다 생각하던 찰나 여름은 왜인지 자꾸 용준과 멀어지려 하는데…'

  const toggleExpand = () => {
    setIsExpanded(!isExpanded)
  }
  useEffect(() => {
    if (contentsRef.current) {
      // 두 줄 높이를 초과하면 '더보기' 버튼 표시
      setIsOverflowing(contentsRef.current.scrollHeight > contentsRef.current.clientHeight)
    }
  }, [contents])
  return (
    <>
      <Wrap>
        <Title>개요</Title>
        <Box>
          <TextWrap>
            <Summary>{summary}</Summary>
            <Contents ref={contentsRef} $isexpanded={isExpanded}>
              {contents}
            </Contents>
            {isOverflowing && ( // 컨텐츠가 길 경우에만 더보기 버튼 표시
              <ToggleButton onClick={toggleExpand}>
                {isExpanded ? <Icon src={up} /> : <Icon src={down} />}
              </ToggleButton>
            )}
          </TextWrap>
        </Box>
      </Wrap>
    </>
  )
}

export default MovieOverview
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
  font-weight: 400;
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
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: ${({ $isExpanded }) => ($isExpanded ? 'none' : 2)};
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
`
const ToggleButton = styled.button`
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(0, 0, 0, 0.25);
  padding: 2px 0;
`
const Icon = styled.img`
  width: 24px;
  height: 24px;
`
