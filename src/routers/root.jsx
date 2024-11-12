import { lazy, Suspense } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import userRouter from './userRouter'
import movieRouter from './movieRouter'
const loading = <div>loading</div>
const MainPage = lazy(() => import('@/pages/Main/Index'))
const MyPage = lazy(() => import('@/pages/MyPage/Index'))
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
    path: '/user',
    children: userRouter,
  },
  {
    path: '/movie',
    children: movieRouter,
  },
])

export default root
