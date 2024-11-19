import { useEffect, useState } from 'react'
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
    pointer-events: none; /* 비디오 클릭 방지 */
  }
`

const ContentWrapper = styled.div`
  position: relative;
  z-index: 1;
`
//TODO(j) 비디오랑 이미지 url store로 받아서 제공할것 + 비디오는 이미지 값 없으면 자동으로 선택되게 할것
function BackgroundContainer({ children }) {
  const [screenSize, setScreenSize] = useState(window.innerWidth < 768 ? 'medium' : 'large')

  useEffect(() => {
    // 화면 크기 업데이트 함수
    const handleResize = () => {
      setScreenSize(window.innerWidth < 768 ? 'medium' : 'large')
    }
    // 리스너 추가
    window.addEventListener('resize', handleResize)
    // 컴포넌트 언마운트 시 리스너 제거
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  return (
    <SBackgroundContainer>
      <video autoPlay loop muted playsInline>
        <source
          src={screenSize === 'medium' ? '/video/ver4.mp4' : '/video/ver3.mp4'}
          type='video/mp4'
        />
      </video>
      <ContentWrapper>
        {children} {/* 추가로 보여줄 콘텐츠 */}
      </ContentWrapper>
    </SBackgroundContainer>
  )
}

export default BackgroundContainer
