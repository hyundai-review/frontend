import React from 'react'
import styled from 'styled-components'
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react'
import { EffectCoverflow } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/effect-coverflow'
import { reviewData } from '@/assets/data/reviewData'
import StoryItem from '@/components/story/StoryItem'
import { useCarousel } from '@/libs/useCarousel'
import PhotoCard from './PhotoCard'
function StoryList() {
  const { handleSlideChange, handleSlideClick } = useCarousel(1)

  return (
    <SwiperContainer>
      <Swiper
        modules={[EffectCoverflow]}
        effect={'coverflow'}
        centeredSlides={true}
        slidesPerView={5}
        initialSlide={2}
        onSlideChange={handleSlideChange}
        coverflowEffect={{
          rotate: 0,
          stretch: -140, // 음수에서 양수로 변경
          depth: 100,
          modifier: 1,
          slideShadows: false,
          scale: 0.9,
        }}
        spaceBetween={0} // 슬라이드 사이 간격 추가
      >
        {reviewData.map((review, index) => (
          <SwiperSlide
            key={review.id}
            onClick={() => handleSlideClick(index, '/main/story', review)}
          >
            <PhotoCard reviewInfo={review} />
          </SwiperSlide>
        ))}
      </Swiper>
    </SwiperContainer>
  )
}

export default StoryList

const SwiperContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .swiper {
    margin-left: -50px;
  }
`
