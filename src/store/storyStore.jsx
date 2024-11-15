import { reviewData } from '@/assets/data/reviewData'
import { create } from 'zustand'

const useStoryStore = create((set) => ({
  reviewList: reviewData,
  focusReview: {},
  isLoading: false,

  setReviewList: (reviewList) => set({ reviewList }),

  // setFavoriteCoinList: (favoriteCoinList) => set({ favoriteCoinList }),
  // clearFavoriteCoinList: () => set({ favoriteCoinList: [] }),

  /* 리뷰 데이터 가져오기 api */
  getReviewList: (memberId) => {
    // api 연결 추가
    // set({ reviewList: data })
  },

  /** reviewId로 foucusReview 설정 */
  updateFocusReview: (reviewId) =>
    set((state) => {
      const foundReview = state.reviewList.find((review) => review.id === reviewId)
      console.log('focusReview:', reviewId)

      return {
        focusReview: foundReview,
      }
    }),

  setLoading: (isLoading) => set({ isLoading }),
}))

export default useStoryStore
