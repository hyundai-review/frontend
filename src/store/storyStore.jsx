import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

const useStoryStore = create(
  persist(
    (set) => ({
      reviewList: [],
      focusReview: {
        reviewId: 0,
        photocard: '',
        content: '',
        movieId: 0,
        rating: 0,
        totalComments: 0,
      },
      isLoading: false,

      setReviewList: (reviewList) => {
        // console.log('Setting reviewList:', reviewList)
        set({ reviewList })
      },

      getReviewList: (memberId) => {
        // api 연결 추가
        // set({ reviewList: data })
      },

      // review 객체를 직접 받아서 focusReview로 설정
      // updateFocusReview: (review) => set({ focusReview: review }),
      // reviewId를 받아서 해당 리뷰를 focusReview로 설정
      updateFocusReview: (reviewId) =>
        set((state) => {
          const foundReview = state.reviewList.find((review) => review.reviewId === reviewId)
          // console.log('foundReview', foundReview)
          if (!foundReview) {
            return {}
          }
          return {
            focusReview: foundReview,
          }
        }),

      setLoading: (isLoading) => set({ isLoading }),
    }),
    {
      name: 'story-storage', // localStorage에 저장될 키 이름
      storage: createJSONStorage(() => localStorage), // 사용할 스토리지 엔진
      // 선택적으로 특정 상태만 유지하고 싶다면 partialize 옵션 사용
      partialize: (state) => ({
        reviewList: state.reviewList,
        focusReview: state.focusReview,
        // isLoading은 제외 (새로고침 시 초기값으로 리셋되도록)
      }),
    },
  ),
)

export default useStoryStore
