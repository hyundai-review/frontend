import useReviewStore from '@/store/reviewStore'
import { Navigate, useLocation, useParams } from 'react-router-dom'

function ProtectedReviewRoute({ children }) {
  const { backgroundImg, currentMovieId, reviewStep, reviewPost, processPhotocard } =
    useReviewStore()
  const location = useLocation()
  const { movieId } = useParams()

  const path = location.pathname.split('/').pop() // URL의 마지막 부분 가져오기

  // movieId가 다른 경우 체크
  if (movieId !== currentMovieId) {
    console.log('MovieId mismatch:', { urlMovieId: movieId, storeMovieId: currentMovieId })
    return <Navigate to={`/movie/${currentMovieId}/detail`} replace />
  }

  // 단계별 필요한 데이터 검증
  const isValidStep = () => {
    console.log('Current path:', path)
    console.log('Background Image:', backgroundImg)
    console.log('Current Movie ID:', currentMovieId)

    switch (path) {
      case 'text':
        return backgroundImg !== ''
      case 'photo':
        return backgroundImg !== '' && reviewPost.content !== '' && reviewPost.rating !== 0
      case 'deploy':
        return (
          backgroundImg !== '' &&
          reviewPost.content !== '' &&
          reviewPost.rating !== 0 &&
          processPhotocard.step1 !== ''
        )
      case 'upload':
        return (
          backgroundImg !== '' &&
          reviewPost.content !== '' &&
          reviewPost.rating !== 0 &&
          processPhotocard.step1 !== '' &&
          processPhotocard.step2 !== ''
        )
      default:
        return true
    }
  }

  if (!isValidStep()) {
    return <Navigate to={`/movie/${currentMovieId}/detail`} replace />
  }

  return children
}

export default ProtectedReviewRoute
