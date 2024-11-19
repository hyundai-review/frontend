export function transformReviewData(data) {
  // console.log('data : ', data)
  if (!data) {
    return []
  }
  return data.map((review) => ({
    movieId: review.movieId || '', // 영화 ID
    movieTitle: review.movieTitle || '', // 영화 제목
    // otherReviewList
    reviewId: review.reviewId,
    rating: review.rating, // 별점
    reviewContent: review.content, // 리뷰 내용
    commentCount: review.totalComments, // 댓글 수
    cardDate: review.updatedAt.slice(0, 10), // 리뷰 작성 날짜
    photocard: review.photocard, // 포토카드 이미지 URL
    authorProfile: review.author.profile || '', // 작성자 프로필
    authorNickname: review.author.nickname || '', // 작성자 닉네임
    isLike: review.isLike, // 좋아요 여부
    isSpoil: review.isSpoil, // 스포일러 여부
  }))
}
// 마이페이지 리뷰 데이터 변환
export function transformMyReviewData(data) {
  // console.log('My : ', data)
  if (!data) {
    return []
  }
  return data.map((review) => ({
    movieId: review.movieId || '', // 영화 ID
    movieTitle: review.movieTitle || '', // 영화 제목
    reviewId: review.reviewId,
    rating: review.rating, // 별점
    reviewContent: review.content, // 리뷰 내용
    commentCount: review.totalComments, // 댓글 수
    cardDate: review.updatedAt.slice(0, 10), // 리뷰 작성 날짜
    photocard: review.photocard, // 포토카드 이미지 URL
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

/** 포스터 & 스토리 사진 리스트 데이터 transform */
export const transformStillcut = (imageData) => {
  const { posters = [], stillcuts = [] } = imageData
  // const IMG_BASE_URL = 'https://image.tmdb.org/t/p/w500'
  // const IMG_BASE_URL = '/tmdb-images'
  // const IMG_BASE_URL = import.meta.env.VITE_IMG_BASE_URL
  const IMG_BASE_URL = 'https://mylittlefra.me/api/images/tmdb/w500'

  let id = 0
  const transformedPosters = posters.slice(0, 5).map((poster, index) => ({
    imgId: id++,
    imgURL: IMG_BASE_URL + poster.filePath, // filePath 사용
  }))

  const transformedStillcuts = stillcuts.slice(0, 5).map((stillcut, index) => ({
    imgId: id++,
    imgURL: IMG_BASE_URL + stillcut.filePath, // filePath 사용
  }))

  const allImages = [...transformedPosters, ...transformedStillcuts]

  // console.log('!~!!!~~~~~~~~~~~~~~~~~~~~~~~~', allImages)
  return allImages
}
