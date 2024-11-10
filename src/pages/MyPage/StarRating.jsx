import styled from 'styled-components'
const StarRating = ({ rating }) => {
  const totalStars = 5

  return (
    <StarWrap>
      {[...Array(totalStars)].map((_, index) => {
        const isFilledStar = index < rating
        return (
          <StarIcon
            key={index}
            src={isFilledStar ? '/icon/star.svg' : '/icon/star2.svg'}
            hasFilter={isFilledStar} // star2.svg에는 filter를 제외
          />
        )
      })}
    </StarWrap>
  )
}

export default StarRating
export const StarWrap = styled.div`
  display: flex;
`

export const StarIcon = styled.img`
  width: 16px;
  height: 16px;
  ${({ hasFilter }) =>
    hasFilter && 'filter: drop-shadow(0px 0px 10px var(--primary-light-red, #ffd7d7));'}
`
