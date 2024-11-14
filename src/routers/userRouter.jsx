import { lazy, Suspense } from 'react'

const loading = <div>loading</div>
const LoginPage = lazy(() => import('@/pages/Login/Index'))
const KakaoPage = lazy(() => import('@/pages/Login/KaKaoRedirectPage'))

const userRouter = () => {
  return [
    {
      path: 'login',
      element: (
        <Suspense fallback={loading}>
          <LoginPage />
        </Suspense>
      ),
    },
    {
      path: 'kakao',
      element: (
        <Suspense fallback={loading}>
          <KakaoPage />
        </Suspense>
      ),
    },
  ]
}

export default userRouter
