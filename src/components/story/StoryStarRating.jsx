import React from 'react'
import styled from 'styled-components'
import STAR from '@/assets/icons/star.svg?react'

const getStarSizes = (max) => ({
  5: ['30px', '40px', '50px', '40px', '30px'],
  4: ['30px', '40px', '40px', '30px'],
  3: ['30px', '40px', '30px'],
  2: ['30px', '30px'],
  1: ['30px'],
})

function StoryRating({ max }) {
  const starSizes = getStarSizes(max)[max]

  return (
    <Container>
      <StarContainer>
        {starSizes.map((size, index) => (
          <StarWrap key={index} size={size}>
            <StyledStar />
          </StarWrap>
        ))}
      </StarContainer>
    </Container>
  )
}

export default StoryRating

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const StarContainer = styled.div`
  display: flex;
  align-items: center;
`

const StarWrap = styled.div`
  width: ${(props) => props.size};
  height: ${(props) => props.size};
  filter: drop-shadow(0px 0px 10px var(--primary-light-red, #ffd7d7));
`

const StyledStar = styled(STAR)`
  width: 100%;
  height: 100%;
  fill: var(--gray-50, #fafafa);
  filter: drop-shadow(0px 0px 10px var(--primary-solid-light, rgba(199, 125, 181, 0.5)));
`
