import styled, { css, keyframes } from 'styled-components'
// 반짝이는 애니메이션
export const sparkleEffect = keyframes`
  0% {
    box-shadow: 0 0 20px #ffffff, 0 0 15px #7ed6a0, 0 0 30px #ffffff;
  }
  50% {
    box-shadow: 0 0 10px #7ed6a0, 0 0 25px #ff00ff, 0 0 50px #7ed6a0;
  }

  100% {
    box-shadow: 0 0 8px #ffffff, 0 0 15px #20ff75, 0 0 30px #20ff75;
  }
`
export const StatusCircle = styled.div`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  // background-color: var(--semantic-success, #7ed6a0);
  background-color: ${(props) => props.$color};
  box-shadow: 0px 0px 10px ${(props) => props.$color};
  /* 색상이 #7ed6a0일 때만 반짝임 효과를 적용 */
  ${(props) =>
    props.$color === '#7ed6a0' &&
    css`
      animation: ${sparkleEffect} 1.5s infinite alternate;
    `}
`
export const StatusText = styled.div`
  color: var(--gray-200, #e4e4e7);
  text-align: right;
  /* regular/sm */
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 21px; /* 150% */
`
