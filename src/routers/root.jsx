import { lazy, Suspense, useState } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import userRouter from './userRouter'
import mainRouter from './mainRouter'
import movieRouter from './movieRouter'
import reviewRouter from './reviewRouter'
import mypageRouter from './mypageRouter'
import MainLayout from '@/components/layout/MainLayout'
import NoAppWrapperLayout from '@/components/layout/NoAppWrapperLayout'

const loading = <div>loading</div>
const MainPage = lazy(() => import('@/pages/Main/Index'))
const SearchPage = lazy(() => import('@/pages/Search/Index'))
const NotFoundPage = lazy(() => import('@/pages/NotFound'))
const root = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense fallback={loading}>
        <MainLayout />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={loading}>
            <MainPage />
          </Suspense>
        ),
      },
      {
        path: '/search',
        element: (
          <Suspense fallback={loading}>
            <SearchPage />
          </Suspense>
        ),
      },
      {
        path: '/mypage',
        children: mypageRouter,
      },
      {
        path: '*',
        element: (
          <Suspense fallback={loading}>
            <NotFoundPage />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: '/main',
    children: mainRouter(),
  },
  {
    path: '/movie',
    element: (
      <Suspense fallback={loading}>
        <NoAppWrapperLayout />
      </Suspense>
    ),
    children: [
      {
        path: '',
        children: movieRouter(),
      },
    ],
  },
  // {
  //   path: '/main',
  //   children: mainRouter(),
  // },

  {
    path: '/user',
    children: userRouter(),
  },
  // {
  //   path: '/movie',
  //   children: movieRouter(),
  // },
  {
    path: '/review',
    children: reviewRouter(),
  },
])

export default root
