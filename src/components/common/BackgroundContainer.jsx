import media from '@/styles/media'
import styled from 'styled-components'

const SBackgroundContainer = styled.div`
  position: relative;
  video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: -1; /* 비디오를 배경으로 배치 */
    filter: blur(10px);
  }
`

const ContentWrapper = styled.div`
  position: relative;
  z-index: 1;
`
//TODO(j) 비디오랑 이미지 url store로 받아서 제공할것 + 비디오는 이미지 값 없으면 자동으로 선택되게 할것
function BackgroundContainer({ children }) {
  const videoUrl = '/video/ver3.mp4'

  return (
    <SBackgroundContainer>
      <video autoPlay loop muted>
        <source src={videoUrl} type='video/mp4' />
      </video>
      <ContentWrapper>
        {children} {/* 추가로 보여줄 콘텐츠 */}
      </ContentWrapper>
    </SBackgroundContainer>
  )
}

export default BackgroundContainer
