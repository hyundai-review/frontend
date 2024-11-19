import styled from 'styled-components'
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react'
import { EffectCoverflow, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/effect-coverflow'
import { useCarousel } from '@/libs/useCarousel'
import PhotoCard from './PhotoCard'
import { useWindowSize } from '@/utils/useWindowSize'
import useStoryStore from '@/store/storyStore'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useApi } from '@/libs/useApi'

function StoryList() {
  const { review } = useParams()
  const { get } = useApi()
  const { setReviewList, reviewList, focusReview } = useStoryStore()

  const { width } = useWindowSize()
  const isMobile = width < 780

  const focusIndex =
    reviewList?.findIndex((review) => review.reviewId === focusReview?.reviewId) ?? 1
  const { handleSlideChange, handleSlideClick, setSwiper, slideNext } = useCarousel(focusIndex)

  return (
    <SwiperContainer>
      <Swiper
        onSwiper={setSwiper}
        modules={isMobile ? [Navigation] : [EffectCoverflow]}
        effect={isMobile ? undefined : 'coverflow'}
        centeredSlides={true}
        slidesPerView='auto'
        initialSlide={focusIndex}
        onSlideChange={handleSlideChange}
        slidesPerGroup={1}
        coverflowEffect={{
          rotate: 0,
          stretch: -140,
          depth: 100,
          modifier: 1,
          slideShadows: false,
          scale: 0.9,
        }}
        spaceBetween={0}
        watchSlidesProgress={true}
        breakpoints={{
          0: {
            slidesPerView: 'auto',
          },
          780: {
            slidesPerView: 'auto',
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
            slidesPerView: 'auto',
            centeredSlides: true,
            coverflowEffect: {
              rotate: 0,
              stretch: -50,
              depth: 100,
              modifier: 1,
              slideShadows: false,
              scale: 0.9,
            },
            spaceBetween: 0,
          },
        }}
      >
        {reviewList?.map((review, index) => (
          <StyledSwiperSlide
            key={index}
            onClick={() => handleSlideClick(index, `/movie/${review.movieId}/detail`)}
          >
            <PhotoCard reviewInfo={review} slideNext={slideNext} index={index} />
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

  width: 100%;
  overflow: hidden;

  .swiper {
    @media (max-width: 779px) {
      width: 362px; // PhotoCard width와 동일 적용
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
  cursor: pointer;

  @media (max-width: 779px) {
    width: 100% !important;
    display: flex;
    justify-content: center;
  }
`
