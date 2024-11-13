import styled, { css } from 'styled-components'

/** 사용법
 *  <Text $variant="lg">큰 텍스트</Text>
 * 
    <Text 
        $variant="lg" 
        $weight="600" 
        $color="#ffffff"
        $align="center"
    >
    커스텀 스타일 텍스트
</Text>
 */

export const textStyles = css`
  /* 기본 스타일 */
  margin: 0;
  padding: 0;
  font-family: Pretendard;
  font-style: normal;

  /* 커스텀 스타일 */
  font-weight: ${(props) => props.$weight || 'inherit'};
  color: ${(props) => props.$color || 'var(--color-gray-200, #e4e4e7)'};
  text-align: ${(props) => props.$align || 'inherit'};

  /* variant 스타일 */
  ${(props) => {
    switch (props.$variant) {
      case 'lg':
        return `
          font-size: 20px;
          font-weight: 200;
          line-height: 30px;
        `
      case 'md':
        return `
          font-size: 16px;
          font-weight: 200;
          line-height: 24px; 
        `

      default:
        return `
          font-size: 16px;
          font-weight: 400;
          line-height: 24px;
        `
    }
  }}
`

export const Text = styled.p`
  ${textStyles}
`

export const TextArea = styled.textarea`
  ${textStyles}
  width: 100%;
  height: 100%;
  background: transparent;
  border: none;
  outline: none;
  resize: none;
  padding: 20px;
  color: ${(props) => props.$textColor || 'var(--color-gray-50)'};
  &::placeholder {
    color: var(--gray-400, #a1a1aa);
  }

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 4px;
  }
`
