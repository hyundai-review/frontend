import styled from 'styled-components'

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

export const Text = styled.p`
  /* 기본 스타일 */
  margin: 0;
  padding: 0;
  font-family: Pretendard;
  font-style: normal;

  /* 커스텀 스타일 */
  font-weight: ${(props) => props.$weight || 'inherit'};
  color: ${(props) => props.$color || 'var(--gray-200, #e4e4e7)'};
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
      case 'lg':
        return `
            font-size: 16px;
            font-weight: 700;
            line-height: 24px; /* 150% */
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
