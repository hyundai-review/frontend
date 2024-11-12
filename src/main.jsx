import { StrictMode, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import GlobalStyle from './styles/globalStyle.jsx'
import styled from 'styled-components'
import bg from '@/assets/DummyBackgroundImage.png'
import Header from './components/common/Header.jsx'

function Root() {
  const [width, setWidth] = useState(window.innerWidth)

  const AppWrapper = styled.div`
    max-width: ${({ width }) => Math.min(1440, width)}px;
    margin: 0 auto;
    min-height: 100dvh;
    background-image: url(${bg});
    width: 100%;
    box-sizing: border-box;
  `

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <StrictMode>
      <GlobalStyle />
      <AppWrapper width={width}>
        <Header isLogin={true} userName={'테스트'} profileImage={''} />
        <App />
      </AppWrapper>
    </StrictMode>
  )
}

createRoot(document.getElementById('root')).render(<Root />)
