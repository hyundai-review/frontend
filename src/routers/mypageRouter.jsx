import React, { lazy, Suspense } from 'react'

const loading = <div>loading...</div>
const MyPage = lazy(() => import('@/pages/MyPage/Index'))
const mypageRouter = [
  {
    path: '',
    element: (
      <Suspense fallback={loading}>
        <MyPage />
      </Suspense>
    ),
  },
]

export default mypageRouter
