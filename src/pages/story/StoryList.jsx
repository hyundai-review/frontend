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
  // const reviewList = useStoryStore((state) => state.reviewList)
  const { review } = useParams()
  const { get } = useApi()
  const { setReviewList, reviewList, focusReview } = useStoryStore()
  // const reviewList = useStoryStore((state) => state.reviewList)
  // const setReviewList = useStoryStore((state) => state.setReviewList)

  const { handleSlideChange, handleSlideClick, setSwiper, slideNext } = useCarousel(2)
  const { width } = useWindowSize()
  const isMobile = width < 780

  // focusReview와 일치하는 review의 index 찾기
  // const focusIndex = reviewList?.findIndex((review) => review.id === focusReview?.id) ?? 2
  // console.log('------------------------------focusReview:', focusReview)
  // console.log('------------------------------reviewList:', reviewList)

  const focusIndex =
    reviewList?.findIndex((review) => review.reviewId === focusReview?.reviewId) ?? 2

  useEffect(() => {
    console.log('------------------------------focusReview:', focusReview)
    console.log('------------------------------reviewList:', reviewList)

    // focusIndex 계산도 여기서
    // const index = reviewList?.findIndex((review) => review.reviewId === focusReview?.reviewId) ?? 2
    // console.log('focusIndex:', index)
  }, [focusReview, reviewList])

  // console.log('focustIndex:', focusIndex)
  // // useEffect(() => {
  //   get(`/reviews/recents`).then((response) => {
  //     console.log('story 조회', response.data.contents)
  //     setReviewList(response.data.contents)
  //   })
  // }, [])

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await get(`/reviews/recents`)
  //       console.log('story 조회', response.data.contents)
  //       if (response.data.contents) {
  //         setReviewList(response.data.contents)
  //       }
  //     } catch (error) {
  //       console.error('Error fetching reviews:', error)
  //     }
  //   }

  //   fetchData()
  // }, [setReviewList])

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
            //TODO 나중에 영화 상세페이지로 이동하게 할 것
            onClick={() => handleSlideClick(index, '#', review)}
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

  @media (max-width: 779px) {
    width: 100% !important;
    display: flex;
    justify-content: center;
  }
`
