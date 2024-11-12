// todo delete
import styled from 'styled-components'
import star from '@/assets/icons/star-white.svg'
import star2 from '@/assets/icons/star-gray.svg'
const ReviewStarRating = ({ rating }) => {
  const totalStars = 5

  return (
    <StarWrap>
      {[...Array(totalStars)].map((_, index) => {
        const isFilledStar = index < rating
        return (
          <StarIcon
            key={index}
            src={isFilledStar ? star : star2}
            hasFilter={isFilledStar} // star2.svg에는 filter를 제외
          />
        )
      })}
    </StarWrap>
  )
}

export default ReviewStarRating
const StarWrap = styled.div`
  /* display: flex; */
`

const StarIcon = styled.img`
  width: 16px;
  height: 16px;
  ${({ hasFilter }) =>
    hasFilter && 'filter: drop-shadow(0px 0px 10px var(--primary-light-red, #ffd7d7));'}
`
