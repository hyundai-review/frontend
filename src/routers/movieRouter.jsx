import React, { lazy, Suspense } from 'react'

const loading = <div>loading...</div>
const MovieDetailPage = lazy(() => import('@/pages/movieDetail/Index'))

const movieRouter = [
  {
    path: ':movieId/detail',
    element: (
      <Suspense fallback={loading}>
        <MovieDetailPage />
      </Suspense>
    ),
  },
]

export default movieRouter
