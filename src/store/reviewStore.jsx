// store/reviewStore.js
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useReviewStore = create(
  persist(
    (set, get) => ({
      reviewStep: 0,
      reviewPost: {
        rating: 0,
        textReview: '',
        photocard: '/assets/images/movie/poster1.png',
        isSpoil: false,
      },
      navi: null, // navi callback 함수 저장
      setNavi: (navi) => set({ navi }),

      // step
      setReviewStep: (step) => set({ reviewStep: step }),

      //   nextStep: () =>
      //     set((state) => ({
      //       reviewStep: Math.min(state.reviewStep + 1, 4),
      //     })),
      nextStep: () => {
        const state = get()
        const nextStepValue = Math.min(state.reviewStep + 1, 4)
        set({ reviewStep: nextStepValue })

        // 라우팅
        if (state.navi) {
          const paths = ['text', 'photo']
          state.navi(paths[nextStepValue])
        }
      },

      prevStep: () => {
        const state = get()
        const prevStepValue = Math.max(state.reviewStep - 1, 0)
        set({ reviewStep: prevStepValue })

        // 라우팅
        if (state.navi) {
          const paths = ['text', 'photo']
          state.navi(paths[prevStepValue])
        }
      },

      // review post
      setReviewPost: (post) =>
        set((state) => ({
          reviewPost: { ...state.reviewPost, ...post },
        })),
      updateReviewPost: (reviewPost) =>
        set(() => ({
          reviewPost: reviewPost,
        })),

      // 초기화
      resetStore: () =>
        set({
          reviewStep: 0,
          reviewPost: {
            rating: 0,
            textReview: '',
            photocard: '',
            isSpoil: false,
          },
        }),
    }),
    {
      name: 'review-storage', // 로컬 스토리지
      partialize: (state) => ({
        reviewStep: state.reviewStep,
        reviewPost: state.reviewPost,
      }),
    },
  ),
)

export default useReviewStore
