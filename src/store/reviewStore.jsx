import { create } from 'zustand'
/** review 생성 store */
//   “rating”: “integer”,
//   “review”: “string”,
//   “isSpoil”: “boolean”,
//   “photocard”: “string”

const useReviewStore = create((set) => ({
  reviewStep: 1,
  reviewPost: {
    rating: 0,
    textReview: '',
    photocard: '',
    isSpoil: false,
  },
  setReviewStep: (reviewStep) => set({ reviewStep }),
  setReviewPost: (reviewPost) => set({ reviewPost }),

  updateReviewStep: (reviewStep) =>
    set((state) => {
      return {
        reviewStep: reviewStep,
      }
    }),
  updateReviewPost: (reviewPost) =>
    set((state) => {
      return {
        reviewPost: reviewPost,
      }
    }),
}))

export default useReviewStore
