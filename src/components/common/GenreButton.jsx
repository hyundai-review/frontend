import styled from 'styled-components'
/*사용 예시
 <GenreButton category='로맨스' onClick={handleLogout}, fontSize=14 />
!fontsize default는 12px*/
function GenreButton({ category, onClick, fontSize }) {
  return (
    <ButtonContainer onClick={onClick}>
      <ButtonText fontSize={fontSize}>{category}</ButtonText>
    </ButtonContainer>
  )
}

export default GenreButton

const ButtonContainer = styled.div`
  position: relative;
  display: inline-flex; /* 내용에 따라 크기 조절 */
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 5px;
  border: 1px solid #b6b5ff;
  box-shadow: 0px 0px 10px 0px var(--primary-solid-light, rgba(199, 125, 181, 0.5));
  padding: 1px 4px;
`
const ButtonText = styled.div`
  text-align: center;
  text-shadow: 0px 0px 10px var(--primary-solid, #c77db5);
  /* regular/xs */
  font-family: Pretendard;
  // font-size: ${({ fontSize }) => fontSize || 12}px; /* fontSize가 없을 때 기본값 12px */
  font-style: normal;
  font-weight: 400;
  line-height: 18px; /* 150% */
  background: linear-gradient(91deg, #b6b5ff 0%, #ffd7d7 99.7%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: calc(12px + 1vw);
`
