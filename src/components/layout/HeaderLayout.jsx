import React from 'react'
import Header from '../common/Header'
import { Outlet } from 'react-router-dom'

function HeaderLayout() {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  )
}

export default HeaderLayout
