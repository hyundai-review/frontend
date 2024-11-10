import styled from 'styled-components'

const BackgroundContainer = styled.div`
  width: 100vw;
  /* height: 874px;
  width: 402px; */
  background: url(${(props) => props.imageUrl}) lightgray 50% / cover no-repeat;
`
export default BackgroundContainer
