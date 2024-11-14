import styled from 'styled-components'

export const ReviewPostBtn = styled.button`
  width: ${(props) => props.$width};
  height: 44px;
  padding: ${(props) => props.$padding || '10px 37px'};
  border-radius: 5px;
  border: 1px solid #b6b5ff;
  background: rgba(0, 0, 0, 0.25);
  box-shadow: 0px 0px 10px 0px var(--primary-solid-light, rgba(199, 125, 181, 0.5));

  cursor: pointer;
  white-space: nowrap; // 텍스트 줄바꿈 방지

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.6);
    backdrop-filter: blur(10px);
    box-shadow: 0 0 15px 5px rgba(255, 255, 255, 0.3);
  }
`

export const IconButton = styled.button`
  all: unset;
  cursor: pointer;
`
