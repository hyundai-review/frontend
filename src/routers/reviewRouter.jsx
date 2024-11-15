import React from 'react'
import { lazy, Suspense } from 'react'
import { Navigate } from 'react-router-dom'

const loading = <div>loading...</div>
const ReviewPostPage = lazy(() => import('@/pages/reviewPost/Index'))
const PostTextReview = lazy(() => import('@/pages/reviewPost/PostTextReview'))
const PostPhotoReview = lazy(() => import('@/pages/reviewPost/PostPhotoReview'))
const PostDeployReview = lazy(() => import('@/pages/reviewPost/PostDeployReview'))
const PostUploadReview = lazy(() => import('@/pages/reviewPost/PostUploadReview'))

const reviewRouter = () => {
  return [
    {
      path: ':movieId/post',
      element: (
        <Suspense fallback={loading}>
          <ReviewPostPage />
        </Suspense>
      ),
      children: [
        {
          index: true,
          element: <Navigate to='text' replace />,
        },
        {
          path: 'text',
          element: <PostTextReview />,
        },
        {
          path: 'photo',
          element: <PostPhotoReview />,
        },
        {
          path: 'deploy',
          element: <PostDeployReview />,
        },
        {
          path: 'upload',
          element: <PostUploadReview />,
        },
      ],
    },
  ]
}

export default reviewRouter
