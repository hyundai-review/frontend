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

/** 스토리 게시 리뷰 생성 시 서버로 보낼 데이터 transform */
export const transformReviewPost = (reviewPost, photocard) => {
  return {
    rating: reviewPost.rating,
    content: reviewPost.content,
    isSpoil: reviewPost.isSpoil,
    photocard: photocard,
  }
}
