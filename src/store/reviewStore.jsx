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
      navi: (path) => (window.location.href = `/review/2/post/${path}`),
      optionBackImg: {
        imgId: 0,
        imgURL: '',
      },
      // 이미지 처리 단계
      processPhotocard: {
        step1: '',
        step2: '',
      },

      /** 사진 background 선택 */
      setOptionBackImg: (backImg) => set({ optionBackImg: backImg }),
      /** 이미지 처리 단계 업로드 */
      setProcessPhotocard: (img) =>
        set((state) => ({
          processPhotocard: { ...state.processPhotocard, ...img },
        })),

      /** 리뷰 프로세스 step */
      setReviewStep: (step) => set({ reviewStep: step }),

      nextStep: () => {
        const state = get()
        const nextStepValue = Math.min(state.reviewStep + 1, 5)
        set({ reviewStep: nextStepValue })

        // 라우팅
        const paths = ['text', 'photo', 'deploy', 'upload']
        state.navi(paths[nextStepValue])
      },

      prevStep: () => {
        const state = get()
        const prevStepValue = Math.max(state.reviewStep - 1, 0)
        set({ reviewStep: prevStepValue })

        // 라우팅
        const paths = ['text', 'photo', 'deploy', 'upload']
        state.navi(paths[prevStepValue])
      },

      /** review post */
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
        processPhotocard: state.processPhotocard,
        optionBackImg: state.optionBackImg,
      }),
    },
  ),
)

export default useReviewStore
