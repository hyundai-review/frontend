import media from '@/styles/media'
import React from 'react'
import styled from 'styled-components'
function NotFound() {
  return (
    <Container>
      <Wrap>
        <Text>404</Text>
        <Detail>페이지가 존재하지 않아요.</Detail>
      </Wrap>
    </Container>
  )
}

export default NotFound
const Container = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`
const Wrap = styled.div`
  padding: 100px 200px;
  border-radius: 10px;
  border: 1px solid #b6b5ff;
  background: rgba(0, 0, 0, 0.25);
  box-shadow: 0px 0px 10px 0px var(--primary-solid-light, rgba(199, 125, 181, 0.5));
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  ${media.medium`
    padding: 50px;
  `}
`
const Text = styled.div`
  color: var(--gray-50, #fafafa);
  text-align: center;
  text-shadow: 0px 0px 10px var(--primary-solid-light, rgba(199, 125, 181, 0.5));

  /* bold/xxl */
  font-family: Pretendard;
  font-size: 32px;
  font-style: normal;
  font-weight: 700;
  line-height: 48px; /* 150% */
`
const Detail = styled.div`
  color: var(--gray-50, #fafafa);
  text-align: center;
  text-shadow: 0px 0px 10px var(--primary-solid-light, rgba(199, 125, 181, 0.5));

  /* light/lg */
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 200;
  line-height: 30px; /* 150% */
`
