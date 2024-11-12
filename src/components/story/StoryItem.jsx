import React from 'react'
import styled from 'styled-components'

function StoryItem({ photocardImg, reviewId }) {
  return (
    <ImgFrame>
      {/* ${reviewId} */}
      <img src={photocardImg} alt={`Slide ${reviewId}`} />
    </ImgFrame>
  )
}

export default StoryItem

const ImgFrame = styled.div`
  width: 240px;
  height: 240px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(5px);

  img {
    width: 200px;
    height: 200px;
    flex-shrink: 0;
    object-fit: cover;

    border-radius: 5px;
    /* background: url('/assets/images/image 11.png') lightgray 50% / cover no-repeat; */
  }
`
