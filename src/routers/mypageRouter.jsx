import PhotocardModal from '@/pages/MyPage/PhotocardModal'
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
  {
    path: ':photocard',
    element: (
      <Suspense fallback={loading}>
        <PhotocardModal />
      </Suspense>
    ),
  },
]

export default mypageRouter
