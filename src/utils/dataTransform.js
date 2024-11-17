export function transformReviewData(data) {
  console.log('data : ', data)
  if (!data) {
    return []
  }
  return data.map((review) => ({
    movieId: review.movieId || '', // 영화 ID
    movieTitle: review.movieTitle || '', // 영화 제목
    // otherReviewList
    reviewdId: review.reviewId,
    rating: review.rating, // 별점
    reviewContent: review.content, // 리뷰 내용
    commentCount: review.totalComments, // 댓글 수
    cardDate: review.updatedAt.slice(0, 10), // 리뷰 작성 날짜
    photocard: review.photocard, // 포토카드 이미지 URL
    authorProfile: review.author.profile, // 작성자 프로필
    authorNickname: review.author.nickname, // 작성자 닉네임
    isLike: review.isLike, // 좋아요 여부
    isSpoil: review.isSpoil, // 스포일러 여부
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
