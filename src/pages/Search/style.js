import media from '@/styles/media'
import styled from 'styled-components'

export const StyledSearchPageBodyWrapper = styled.div`
  width: 100%;
`

export const StyledSearchPageResultWrapper = styled.div`
  height: 30px;
  width: fit-content;
  color: gray;
  width: 100%;
  padding-left: 50px;
  ${media.medium`
  padding-left:30px`}
`

export const StyledSearchPageContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  padding-top: 20px;
`

export const StyledMoviePosterWrapper = styled.div`
  display: grid;
  justify-content: center;
  place-items: center;
  gap: 40px;
  grid-template-columns: repeat(6, 180px);
  //더 부드러운 반응형
  /* @media (max-width: 1280px) {
    grid-template-columns: repeat(auto-fill, 180px);
  } */
  ${media.medium`
    grid-template-columns : repeat(3, 180px)
  `}
  ${media.small`
  grid-template-columns: repeat(3,130px);
  gap:2px
  `}
`
