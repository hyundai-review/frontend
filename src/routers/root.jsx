import { lazy, Suspense } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import userRouter from './userRouter'

const loading = <div>loading</div>
const MainPage = lazy(() => import('@/pages/Main/Index'))
const MyPage = lazy(() => import('@/pages/MyPage/Index'))
const SearchPage = lazy(() => import('@/pages/Search/Index'))

const root = createBrowserRouter([
  {
    path: '',
    element: (
      <Suspense fallback={loading}>
        <MainPage />
      </Suspense>
    ),
  },
  {
    path: '/mypage',
    element: (
      <Suspense fallback={loading}>
        <MyPage />
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
    path: '/user',
    children: userRouter,
  },
])

export default root
