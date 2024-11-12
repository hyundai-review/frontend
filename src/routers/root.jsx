import { lazy, Suspense } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import userRouter from './userRouter'

const loading = <div>loading</div>
const MainPage = lazy(() => import('@/pages/Search/Index'))

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
    path: '/user',
    children: userRouter,
  },
])

export default root
