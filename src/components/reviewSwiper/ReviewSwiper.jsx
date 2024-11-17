import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import Stories from '../story/Stories'
import media from '@/styles/media'
import { useNavigate } from 'react-router-dom'
import useModalStore from '@/store/modalStore'

function ReviewSwiper({ dataList }) {
  const navigate = useNavigate()
  const dataLength = dataList.length
  const { openModal } = useModalStore()

  const handleSlideClick = (item) => {
    console.log('슬라이드클릭 >>> ', item)
    // 모달 열기
    openModal('photoCard', {
      photocard: {
        image: item.photocard,
        name: item.movieTitle,
      },
    })
  }
  return (
    <div>
      <SwiperWrapper>
        <Swiper style={{ margin: 0 }} slidesPerView={'auto'}>
          {dataList.map((review, index) => (
            <SwiperSlide
              key={index}
              onClick={() => handleSlideClick(review)}
              style={{ width: 250 }}
            >
              <ImageSlideWrap>
                <ImageSlide $imageurl={review.photocard} />
              </ImageSlideWrap>
            </SwiperSlide>
          ))}
        </Swiper>
      </SwiperWrapper>
      <StoriesWrapper>
        <Stories dataList={dataList} />
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
  background: url(${(props) => props.$imageurl}) lightgray 50% / cover no-repeat;
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
