import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react'
import { EffectCoverflow } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/effect-coverflow'
import { useCarousel } from '@/libs/useCarousel'
import PhotoCard from './PhotoCard'
import { useWindowSize } from '@/utils/useWindowSize'

function StoryList({ reviewData }) {
  const { handleSlideChange, handleSlideClick } = useCarousel(1)
  const { width } = useWindowSize()
  const isMobile = width < 780

  return (
    <SwiperContainer>
      <Swiper
        modules={isMobile ? [Navigation] : [EffectCoverflow]}
        effect={isMobile ? undefined : 'coverflow'}
        centeredSlides={true}
        slidesPerView={5}
        initialSlide={2}
        onSlideChange={handleSlideChange}
        coverflowEffect={{
          rotate: 0,
          stretch: -140,
          depth: 100,
          modifier: 1,
          slideShadows: false,
          scale: 0.9,
        }}
        spaceBetween={0}
        breakpoints={{
          0: {
            slidesPerView: 1,
          },
          780: {
            slidesPerView: 2,
            coverflowEffect: {
              stretch: -140,
            },
          },
          906: {
            coverflowEffect: {
              stretch: -50,
            },
          },
          1358: {
            slidesPerView: 5,
            centeredSlides: true,
            coverflowEffect: {
              rotate: 0,
              stretch: -140,
              depth: 100,
              modifier: 1,
              slideShadows: false,
              scale: 0.9,
            },
            spaceBetween: 0,
          },
        }}
      >
        {reviewData.map((review, index) => (
          <StyledSwiperSlide
            key={review.id}
            onClick={() => handleSlideClick(index, '/main/story', review)}
          >
            <PhotoCard reviewInfo={review} />
          </StyledSwiperSlide>
        ))}
      </Swiper>
    </SwiperContainer>
  )
}

export default StoryList

const SwiperContainer = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;

  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .swiper {
    margin-left: -50px;

    @media (max-width: 779px) {
      width: 362px; // PhotoCard width와 동일
      margin: 0 auto;

      /* .swiper {
        width: 100% !important; 
        margin: 0;
      }

      .swiper-wrapper {
        width: 100%;
      } */
    }
  }
`

const StyledSwiperSlide = styled(SwiperSlide)`
  width: auto !important; // Swiper의 기본 width 스타일 오버라이드
  height: auto !important; // Swiper의 기본 height 스타일 오버라이드

  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 779px) {
    width: 100% !important;
    display: flex;
    justify-content: center;
  }
`
