import { lazy, Suspense } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import userRouter from './userRouter'
import mainRouter from './mainRouter'
import movieRouter from './movieRouter'
import mypageRouter from './mypageRouter'
import MainLayout from '@/components/layout/MainLayout'
import HeaderLayout from '@/components/layout/HeaderLayout'
const loading = <div>loading</div>
const MainPage = lazy(() => import('@/pages/Main/Index'))
const SearchPage = lazy(() => import('@/pages/Search/Index'))

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
        path: '/movie',
        element: (
          <Suspense fallback={loading}>
            <HeaderLayout />
          </Suspense>
        ),
        children: [
          {
            path: '',
            children: movieRouter,
          },
        ],
      },
    ],
  },

  {
    path: '/main',
    children: mainRouter(),
  },

  {
    path: '/user',
    children: userRouter(),
  },
])

export default root
