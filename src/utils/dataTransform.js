export function transformReviewData(myReviewData) {
  return myReviewData.contents.map((review) => ({
    movieId: review.movieId, // 영화 ID
    movieTitle: review.movieTitle, // 영화 제목
    rating: review.rating, // 별점
    reviewContent: review.content, // 리뷰 내용
    commentCount: review.totalComments, // 댓글 수
    cardDate: review.createdAt, // 리뷰 작성 날짜
    photocard: review.photocard, // 포토카드 이미지 URL
  }))
}
