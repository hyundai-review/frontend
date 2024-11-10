import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, EffectCoverflow } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/effect-coverflow'

import styled from 'styled-components'
import { reviewData } from '@/assets/data/reviewData'
import StoryItem from './StoryItem'

function Stories() {
  return (
    <SwiperContainer>
      <Swiper
        modules={[EffectCoverflow]}
        effect={'coverflow'}
        centeredSlides={true}
        slidesPerView={3}
        initialSlide={1}
        coverflowEffect={{
          rotate: 0,
          stretch: 60, // 슬라이드 사이의 거리를 조절
          depth: 100, // 슬라이드의 앞뒤 거리감
          modifier: 1,
          slideShadows: false,
          scale: 0.8, // 비활성 슬라이드의 크기를 조절
        }}
      >
        {reviewData.map((review, index) => (
          <SwiperSlide key={review.id} onClick={() => handleSlideClick(index)}>
            <StoryItem photocardImg={review.photocard} reviewId={review.id} />
          </SwiperSlide>
        ))}
      </Swiper>
    </SwiperContainer>
  )
}

const handleSlideClick = (index) => {
  const swiper = document.querySelector('.swiper').swiper
  if (swiper) {
    swiper.slideTo(index)
  }
}

export default Stories

const SwiperContainer = styled.div`
  width: 362px;
  height: 100%;
  overflow: hidden;

  .swiper {
    width: 482px;
    margin-left: -30px;
    left: 50%;
    transform: translateX(-50%); // 중앙 정렬
  }

  .swiper-wrapper {
    align-items: center;
  }

  .swiper-slide {
  }
`
