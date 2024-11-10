import styled from 'styled-components'
import media from '../media'
export const ReviewTitleWrap = styled.div`
  margin-top: 20px;
  padding-left: 20px;
`
export const ReviewTitle = styled.div`
  color: var(--gray-200, #e4e4e7);
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 200;
  line-height: 30px;
`
export const GalleryContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`
export const ImageSlideWrap = styled.div`
  padding: 20px;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(0, 0, 0, 0.25);
`
export const ImageSlide = styled.div`
  position: relative;
  border-radius: 5px;
  width: 200px;
  height: 200px;
  background: url(${(props) => props.imageUrl}) lightgray 50% / cover no-repeat;
`

export const ImageText = styled.div`
  position: absolute;
  bottom: 12px;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 2px;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  text-align: center;
  padding: 4px 10px;
  margin: 0 auto;
  font-family: Pretendard;
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  line-height: 15px;
`

export const ReviewContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  margin-top: 20px;
`
