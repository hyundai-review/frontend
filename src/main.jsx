import { StrictMode, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import GlobalStyle from './styles/globalStyle.jsx'
import styled from 'styled-components'

function Root() {
  const [width, setWidth] = useState(window.innerWidth)

  const AppWrapper = styled.div`
    max-width: ${({ width }) => Math.min(1440, width)}px;
    margin: 0 auto;
    min-height: 100dvh;
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
        <App />
      </AppWrapper>
    </StrictMode>
  )
}

createRoot(document.getElementById('root')).render(<Root />)
