// store/reviewStore.js
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useReviewStore = create(
  persist(
    (set, get) => ({
      reviewStep: 0,
      navi: null,
      currentMovieId: null,

      reviewPost: {
        rating: 0,
        content: '',
        photocard: '/assets/images/movie/poster1.png',
        isSpoil: false,
      },
      optionBackImg: {
        imgId: 0,
        imgURL: '',
      },
      // 이미지 처리 단계
      processPhotocard: {
        step1: '',
        step2: '',
      },

      /** 라우팅 */
      setNavi: (navigate) => set({ navi: navigate }),
      setCurrentMovieId: (movieId) => set({ currentMovieId: movieId }),

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
        const nextStepValue = Math.min(state.reviewStep + 1, 3)
        set({ reviewStep: nextStepValue })

        // 라우팅
        const movieId = window.location.pathname.split('/')[2]
        const paths = ['text', 'photo', 'deploy', 'upload']

        if (state.navi) {
          state.navi(`/review/${movieId}/post/${paths[nextStepValue]}`)
        }
      },

      prevStep: () => {
        const state = get()
        const prevStepValue = Math.max(state.reviewStep - 1, 0)
        set({ reviewStep: prevStepValue })

        // 라우팅
        const movieId = window.location.pathname.split('/')[2]
        const paths = ['text', 'photo', 'deploy', 'upload']

        if (state.navi) {
          state.navi(`/review/${movieId}/post/${paths[prevStepValue]}`)
        }
      },

      /** review post */
      setReviewPost: (post) =>
        set((state) => ({
          reviewPost: { ...state.reviewPost, ...post },
        })),

      // 초기화
      resetStore: () => {
        set({
          reviewStep: 0,
          currentMovieId: null,
          reviewPost: {
            rating: 0,
            content: '',
            photocard: '',
            isSpoil: false,
          },
          processPhotocard: {
            step1: '',
            step2: '',
          },
          optionBackImg: {
            imgId: 0,
            imgURL: '',
          },
        })
      },
    }),

    {
      name: 'review-storage', // 로컬 스토리지
      partialize: (state) => ({
        reviewStep: state.reviewStep,
        currentMovieId: state.currentMovieId,
        reviewPost: state.reviewPost,
        processPhotocard: state.processPhotocard,
        optionBackImg: state.optionBackImg,
      }),
    },
  ),
)

export default useReviewStore
