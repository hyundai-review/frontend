import React from 'react'
import Header from '../common/Header'
import MobileNavigationBar from '../common/MobileNavigationBar'
import { Outlet } from 'react-router-dom'

function MainLayout() {
  return (
    <div>
      <Header />
      <Outlet />
      <MobileNavigationBar />
    </div>
  )
}

export default MainLayout
