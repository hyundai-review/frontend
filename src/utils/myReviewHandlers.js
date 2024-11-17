export const validateReviewForm = (formData, openModal) => {
  // 별점이 0점인 경우
  if (formData.rating === 0 || !formData.rating) {
    openModal('alert', { message: '별점을 입력해주세요.' })
    return false
  }

  // 내용이 비어 있는 경우
  if (!formData.content.trim()) {
    openModal('alert', { message: '내용을 작성해주세요.' })
    return false
  }

  // 유효성 검사를 통과한 경우
  return true
}
