import styled from 'styled-components'
/*사용 예시
 <Button text='로그아웃' onClick={handleLogout} />*/
function MainGenreButton({ text, onClick, isactive }) {
  const StyledText = isactive ? ActiveButtonText : InactiveButtonText
  return (
    <ButtonContainer onClick={onClick} isactive={isactive}>
      <StyledText>{text}</StyledText>
    </ButtonContainer>
  )
}

export default MainGenreButton

const ButtonContainer = styled.div`
  position: relative;
  display: inline-flex; /* 내용에 따라 크기 조절 */
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 4px 12px; /* 여백 설정 */
  border-radius: 10px;
  border: ${({ $isactive }) =>
    $isactive ? '1px solid #b6b5ff' : '1px solid var(--gray-400, #A1A1AA)'};
  background: rgba(0, 0, 0, 0.25);
  box-shadow: ${({ $isactive }) => ($isactive ? '0px 0px 10px rgba(199, 125, 181, 0.7)' : 'none')};
  backdrop-filter: blur(2px);
  transition: all 0.8s ease;
  height: fit-content;
`
// 활성화된 상태의 텍스트 스타일
const ActiveButtonText = styled.div`
  font-family: Pretendard;
  font-size: 17px;
  font-weight: 700;
  line-height: 21px;
  text-align: center;
  background: linear-gradient(91deg, #b6b5ff 0%, #ffd7d7 99.7%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`

// 비활성화된 상태의 텍스트 스타일
const InactiveButtonText = styled.div`
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 400;
  line-height: 21px;
  text-align: center;
  color: var(--gray-400, #a1a1aa);
`
