import styled from 'styled-components'

export const Box = styled.div`
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(0, 0, 0, 0.25);
  flex-shrink: 0;

  /* width: ${(props) => `min(${props.$width}, 90%)`}; */
  width: ${(props) => props.$width};
  min-width: ${(props) => props.$minWidth || 'auto'};
  /* min-width: ${(props) => props.$minWidth || '400px'}; */
  height: ${(props) => props.$height};

  /* display: flex; */
  /* justify-content: center; */
`
