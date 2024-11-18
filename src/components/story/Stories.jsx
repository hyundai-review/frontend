import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react'
import { EffectCoverflow } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/effect-coverflow'
import styled from 'styled-components'
import StoryItem from './StoryItem'
import { useCarousel } from '@/libs/useCarousel'
import useModalStore from '@/store/modalStore'
import { useNavigate } from 'react-router-dom'

function Stories({ dataList, path }) {
  const { handleSlideChange, handleSlideClick } = useCarousel(1)
  const openModal = useModalStore((state) => state.openModal)
  const navigate = useNavigate()

  console.log('dataList', dataList)
  const handleClick = (index, path, review) => {
    console.log('진짜찐짜 확인', {
      index: index,
      path: path,
      review: review,
    })

    if (path === '/user/login') {
      navigate(path) // /user/login 경로로 이동
    } else if (path) {
      handleSlideClick(index, path, review)
    } else {
      openModal(review)
    }
  }

  return (
    <SwiperContainer>
      <Swiper
        modules={[EffectCoverflow]}
        effect={'coverflow'}
        centeredSlides={true}
        slidesPerView={3}
        initialSlide={1}
        onSlideChange={handleSlideChange}
        coverflowEffect={{
          rotate: 0,
          stretch: 60, // 슬라이드 사이의 거리를 조절
          depth: 100, // 슬라이드의 앞뒤 거리감
          modifier: 1,
          slideShadows: false,
          scale: 0.8, // 비활성 슬라이드의 크기를 조절
        }}
      >
        {dataList.map((review, index) => (
          <SwiperSlide
            key={index}
            // onClick={() => handleSlideClick(index, '/main/story', review)}
            onClick={() => handleClick(index, path, review)}
          >
            <StoryItem photocardImg={review.photocard} reviewId={review.reveiwId} />
          </SwiperSlide>
        ))}
      </Swiper>
    </SwiperContainer>
  )
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
