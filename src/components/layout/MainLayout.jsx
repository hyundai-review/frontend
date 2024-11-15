import React, { useEffect, useState } from 'react'
import Header from '../common/Header'
import MobileNavigationBar from '../common/MobileNavigationBar'
import { Outlet } from 'react-router-dom'
import styled from 'styled-components'
import BackgroundContainer from '../common/BackgroundContainer'

function MainLayout() {
  const [width, setWidth] = useState(window.innerWidth)

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  return (
    <div>
      <BackgroundContainer>
        <Header />
        <AppWrapper width={width}>
          <Outlet />
        </AppWrapper>
        <MobileNavigationBar />
      </BackgroundContainer>
    </div>
  )
}

const AppWrapper = styled.div`
  max-width: ${({ width }) => Math.min(1440, width)}px;
  margin: 0 auto;
  min-height: 100dvh;
`

export default MainLayout
