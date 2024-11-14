import React from 'react'
import Header from '../common/Header'
import { Outlet } from 'react-router-dom'

function OnlyHeaderLayout() {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  )
}

export default OnlyHeaderLayout
