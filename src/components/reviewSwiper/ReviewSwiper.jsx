import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import Stories from '../story/Stories'
import media from '@/styles/media'

function ReviewSwiper({ dataList, path }) {
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.matchMedia(media.small).matches)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div>
      <SwiperWrapper>
        <Swiper
          breakpoints={{
            1380: {
              slidesPerView: 5.6,
            },
            1139: {
              slidesPerView: 4.6,
            },
            900: {
              slidesPerView: 3.6,
            },
            659: {
              slidesPerView: 2.6,
            },
            402: {
              slidesPerView: 1.6,
            },
          }}
        >
          {reviewData.map((review, index) => (
            <SwiperSlide onClick={`여기 ${path}로 이동`}>
              <ImageSlideWrap>
                <ImageSlide imageUrl={review.photocard}>
                  <ImageText>{'여기는 나중에 대체됨'}</ImageText>
                </ImageSlide>
              </ImageSlideWrap>
            </SwiperSlide>
          ))}
        </Swiper>
      </SwiperWrapper>
      <StoiresWrapper>
        <Stories dataList={reviewData} path={path} />
      </StoiresWrapper>
    </div>
  )
}

const ImageSlideWrap = styled.div`
  padding: 20px;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(0, 0, 0, 0.25);
  width: fit-content;
`
const ImageSlide = styled.div`
  position: relative;
  border-radius: 5px;
  width: 200px;
  height: 200px;
  background: url(${(props) => props.imageUrl}) lightgray 50% / cover no-repeat;
`

const ImageText = styled.div`
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

const SwiperWrapper = styled.div`
  display: flex;
  position: relative;
  ${media.small`
        display:none
    `}
  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 5%;
    height: 100%;
    background: linear-gradient(to left, rgba(0, 0, 0, 1), rgba(255, 255, 255, 0));
    z-index: 1;
  }
`

const StoiresWrapper = styled.div`
  display: none;
  ${media.small`
    display:flex
  `}
  justify-content: center;
`

export default ReviewSwiper
