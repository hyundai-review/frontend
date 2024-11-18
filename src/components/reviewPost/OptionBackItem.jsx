import useReviewStore from '@/store/reviewStore'
import React from 'react'
import styled from 'styled-components'

function OptionBackItem({ backImg, backImgId }) {
  const { optionBackImg, setOptionBackImg } = useReviewStore()

  const handleImgClick = () => {
    setOptionBackImg({
      imgURL: backImg,
    })
  }

  return (
    <ImgFrame onClick={handleImgClick}>
      <img src={backImg} alt={`Slide ${backImgId}`} />
    </ImgFrame>
  )
}

export default OptionBackItem

const ImgFrame = styled.div`
  width: 100px;
  height: 100px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(0, 0, 0, 0.25);

  img {
    width: 83.333px;
    height: 83.333px;
    flex-shrink: 0;
    object-fit: cover;

    border-radius: 5px;
  }
`
