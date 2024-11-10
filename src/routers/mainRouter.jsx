import React from 'react'
import { lazy, Suspense } from 'react'

const loading = <div>loading...</div>
const StoryPage = lazy(() => import('@/pages/story/Index'))

const mainRouter = () => {
  return [
    {
      path: 'story/:reviewId',
      element: (
        <Suspense fallback={loading}>
          <StoryPage />
        </Suspense>
      ),
    },
  ]
}

export default mainRouter
