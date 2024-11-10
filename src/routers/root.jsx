import { lazy, Suspense } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import userRouter from './userRouter'
import mainRouter from './mainRouter'

const loading = <div>loading</div>
const MainPage = lazy(() => import('@/pages/main/Index'))

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
    path: '/main',
    children: mainRouter(),
  },
  {
    path: '/user',
    children: userRouter(),
  },
])

export default root
