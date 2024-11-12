import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react'
import { EffectCoverflow } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/effect-coverflow'
import StoryItem from '@/components/story/StoryItem'
import { useCarousel } from '@/libs/useCarousel'
import PhotoCard from './PhotoCard'
import media from '@/styles/media'

function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  })

  useEffect(() => {
    // 화면 크기를 업데이트하는 핸들러
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    // 이벤트 리스너 등록
    window.addEventListener('resize', handleResize)

    // 초기 화면 크기 설정
    handleResize()

    // 클린업 함수
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return windowSize
}

function StoryList({ reviewData }) {
  const { handleSlideChange, handleSlideClick } = useCarousel(1)
  const { width } = useWindowSize() // 화면 크기 감지를 위한 훅
  const isMobile = width < 780

  return (
    <SwiperContainer>
      <Swiper
        modules={isMobile ? [Navigation] : [EffectCoverflow]} // 모바일에서는 Navigation만
        effect={isMobile ? undefined : 'coverflow'} // 모바일에서는 효과 제거
        // navigation={isMobile}
        // modules={[EffectCoverflow]}
        // effect={'coverflow'}
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
            coverflowEffect: {
              // stretch: -50,
              // depth: 60,
            },
          },
          // 768px 이상일 때 적용될 설정
          780: {
            slidesPerView: 2,
            // spaceBetween: 20,
            coverflowEffect: {
              stretch: -140,
              // depth: 60,
            },
          },
          906: {
            coverflowEffect: {
              stretch: -50,
              // depth: 60,
            },
          },
          // 768px 이상일 때 적용될 설정
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

  ${media.small`
    background-color: yellow;
  `}

  @media (min-width: 780px) {
    background-color: white;
  }

  @media (min-width: 906px) {
    background-color: violet;
  }
  @media (min-width: 1358px) {
    background-color: blue;
  }

  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .swiper {
    margin-left: -50px;

    @media (max-width: 779px) {
      width: 362px; // PhotoCard의 width와 동일하게 설정
      margin: 0 auto;

      /* .swiper {
        width: 100% !important; // Swiper가 컨테이너 크기를 따르도록 강제
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
