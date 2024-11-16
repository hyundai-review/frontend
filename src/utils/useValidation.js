import useReviewStore from '@/store/reviewStore'
import { useNavigate, useParams } from 'react-router-dom'

/** 로컬스토리지 분실 대비 */
export const useReviewValidation = () => {
  const { reviewPost } = useReviewStore()
  const navigate = useNavigate()
  const { movieId } = useParams()

  const isReviewDataValid = () => {
    console.log('reviewPost:', reviewPost) // 값 확인
    console.log('rating:', reviewPost.rating) // rating 값 확인
    console.log('content:', reviewPost.content) // content 값 확인

    if (!reviewPost.rating || !reviewPost.content) {
      alert('리뷰 작성 정보가 유실되었습니다. 처음부터 다시 작성해주세요.')
      navigate(`/review/${movieId}/post/text`)
      return false
    }
    return true
  }

  return { isReviewDataValid }
}
