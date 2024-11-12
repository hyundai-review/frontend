import styled from 'styled-components'
function Button({ text, onClick }) {
  return (
    <ButtonContainer onClick={onClick}>
      <ButtonText>{text}</ButtonText>
    </ButtonContainer>
  )
}

export default Button

export const ButtonContainer = styled.div`
  position: relative;
  display: inline-flex; /* 내용에 따라 크기 조절 */
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 4px 12px; /* 여백 설정 */
  background: rgba(0, 0, 0, 0.25);
  box-shadow: 0px 0px 10px rgba(199, 125, 181, 0.5);
  border-radius: 94px;
  border: 1px solid #b6b5ff;
  backdrop-filter: blur(10px);
  height: fit-content;
`
export const ButtonText = styled.div`
  color: #b6b5ff;
  font-size: 14px;
  font-family: 'Pretendard', sans-serif;
  font-weight: 400;
  line-height: 21px;
  word-wrap: break-word;
  text-align: center;
`
