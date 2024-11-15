import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import Stories from '../story/Stories'
import media from '@/styles/media'
import { useNavigate } from 'react-router-dom'

function ReviewSwiper({ dataList, path }) {
  const navigate = useNavigate()
  const dataLength = dataList.length

  const handleSlideClick = (index, path, item) => {
    navigate(`${path}/${item.id}`)
  }
  return (
    <div>
      <SwiperWrapper>
        <Swiper style={{ margin: 0 }} slidesPerView={'auto'}>
          {dataList.map((review, index) => (
            <SwiperSlide
              onClick={() => handleSlideClick(index, path, review)}
              style={{ width: 250 }}
            >
              <ImageSlideWrap>
                <ImageSlide imageUrl={review.photocard}>
                  <ImageText>{'여기는 나중에 대체됨'}</ImageText>
                </ImageSlide>
              </ImageSlideWrap>
            </SwiperSlide>
          ))}
        </Swiper>
      </SwiperWrapper>
      <StoriesWrapper>
        <Stories dataList={dataList} path={path} />
      </StoriesWrapper>
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
  justify-content: flex-start;
  align-items: flex-start;
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

const StoriesWrapper = styled.div`
  display: none;
  ${media.small`
    display:flex
  `}
  justify-content: center;
`

export default ReviewSwiper
