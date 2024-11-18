export function mapMovieStatus(status) {
  switch (status) {
    case 'NOW_PLAYING':
      return '상영 중'
    case 'UPCOMING':
      return '개봉 예정'
    case 'RELEASED':
      return '개봉 완료'
    case 'UNKNOWN':
    default:
      return '정보 없음'
  }
}
export function getStatusColor(status) {
  switch (status) {
    case 'NOW_PLAYING':
      return '#7ed6a0' // 상영 중 (초록색)
    case 'UPCOMING':
      return '#9DACFF' // 개봉예정 (보라색)
    case 'RELEASED':
      return '#FF9ECD' // 개봉 완료 (파란색)
    case 'UNKNOWN':
    default:
      return '#d63031' // 오류 또는 미확인 (빨간색)
  }
}
