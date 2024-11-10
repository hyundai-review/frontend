import { lazy, Suspense } from 'react'

const loading = <div>loading</div>
const LoginPage = lazy(() => import('@/pages/login/Index'))
const KakaoPage = lazy(() => import('@/pages/login/KaKaoRedirectPage'))

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
