import React from 'react'
import Header from '../common/Header'
import { Outlet } from 'react-router-dom'
import MobileNavigationBar from '../common/MobileNavigationBar'
import Footer from '../common/Footer'

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
