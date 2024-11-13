export function transformReviewData(myReviewData) {
  return myReviewData.contents.map((review) => ({
    id: review.reviewId, // 리뷰 ID
    title: review.movieTitle, // 영화 제목
    content: review.content, // 리뷰 내용
    photocard: review.photocard, // 포토카드 이미지 URL
  }))
}
