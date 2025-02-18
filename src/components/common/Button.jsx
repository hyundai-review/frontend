import styled from 'styled-components'
/*사용 예시
 <Button text='로그아웃' onClick={handleLogout} />*/
function Button({ text, onClick, ispadding }) {
  return (
    <ButtonContainer onClick={onClick} $ispadding={ispadding}>
      <ButtonText>{text}</ButtonText>
    </ButtonContainer>
  )
}

export default Button

const ButtonContainer = styled.div`
  position: relative;
  display: inline-flex; /* 내용에 따라 크기 조절 */
  align-items: center;
  justify-content: center;
  cursor: pointer;
  // padding: 4px 12px; /* 여백 설정 */
  padding: ${({ $ispadding }) => ($ispadding ? '4px 20px' : '4px 12px')};
  background: rgba(0, 0, 0, 0.25);
  box-shadow: 0px 0px 10px rgba(199, 125, 181, 0.5);
  border-radius: 94px;
  border: 1px solid #b6b5ff;
  backdrop-filter: blur(10px);
  transition: all 0.8s ease;
  height: fit-content;
  &:hover {
    background: rgba(0, 0, 0, 0.4);
    box-shadow: 0px 0px 15px rgba(199, 125, 181, 1);
    transform: scale(1.05);
  }
`
const ButtonText = styled.div`
  color: #b6b5ff;
  font-size: 14px;
  font-family: 'Pretendard', sans-serif;
  font-weight: 400;
  line-height: 21px;
  word-wrap: break-word;
  text-align: center;
`
