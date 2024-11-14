import React from 'react'
import Header from '../common/Header'
import { Outlet } from 'react-router-dom'
import MobileNavigationBar from '../common/MobileNavigationBar'

function HeaderLayout() {
  return (
    <div>
      <Header />
      <Outlet />
      <MobileNavigationBar />
    </div>
  )
}

export default HeaderLayout
