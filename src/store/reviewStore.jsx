// store/reviewStore.js
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useReviewStore = create(
  persist(
    (set, get) => ({
      reviewStep: 0,
      navi: null,
      currentMovieId: null, // 영화상세페이지 movieId
      reviewPostMovieId: null, // 리뷰를 작성한 movieId
      backgroundImg: '', // 리뷰 생성 페이지 background
      reviewPost: {
        rating: 0,
        content: '',
        isSpoil: false,
      },
      optionBackImg: {
        // 선택된 스틸컷
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
      setReviewPostMovieId: (movieId) => set({ reviewPostMovieId: movieId }),

      /** 사진 background 선택 */
      setOptionBackImg: (backImg) => set({ optionBackImg: backImg }),
      setBackgroundImg: (
        url, // 리뷰 생성 페이지 background
      ) =>
        set((state) => ({
          backgroundImg: url,
          optionBackImg: {
            imgURL: url,
          },
        })),

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
        set((state) => ({
          reviewStep: 0,
          currentMovieId: state.currentMovieId,
          reviewPostMovieId: state.currentMovieId,
          // backgroundImg는 이전 값 유지
          backgroundImg: state.backgroundImg, // 기존 값 유지
          reviewPost: {
            rating: 0,
            content: '',
            isSpoil: false,
          },
          processPhotocard: {
            step1: '',
            step2: '',
          },
          optionBackImg: {
            imgURL: state.backgroundImg, // backgroundImg와 동일한 값으로 설정
          },
        }))
      },
    }),

    {
      name: 'review-storage', // 로컬 스토리지
      partialize: (state) => ({
        reviewStep: state.reviewStep,
        currentMovieId: state.currentMovieId,
        reviewPostMovieId: state.reviewPostMovieId,
        reviewPost: state.reviewPost,
        processPhotocard: state.processPhotocard,
        optionBackImg: state.optionBackImg,
        backgroundImg: state.backgroundImg,
      }),
    },
  ),
)

export default useReviewStore
