import React, { useEffect, useState } from 'react'
import Header from '../common/Header'
import MobileNavigationBar from '../common/MobileNavigationBar'
import { Outlet } from 'react-router-dom'
import styled from 'styled-components'

function MainLayout() {
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
    <div>
      <Header />
      <AppWrapper width={width}>
        <Outlet />
      </AppWrapper>
      <MobileNavigationBar />
    </div>
  )
}

export default MainLayout
