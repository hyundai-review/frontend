import useStoryStore from '@/store/storyStore'
import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const useCarousel = (initialIndex = 1) => {
  const navigate = useNavigate()
  const [activeIndex, setActiveIndex] = useState(initialIndex)
  const { updateFocusReview, reviewList } = useStoryStore()
  const [swiper, setSwiper] = useState(null)

  /** 다음 슬라이드로 이동하는 함수 */
  const slideNext = () => {
    if (swiper && !swiper.isEnd) {
      // swiper.slideNext()
      swiper.slideTo(activeIndex + 1)
      // updateFocusReview(currentReview.id)
    }
  }

  /** 슬라이드 index 바꾸는 함수 */
  const handleSlideChange = (swiper) => {
    console.log('activeIndex:', swiper.activeIndex)

    setActiveIndex(swiper.activeIndex)

    // 현재 focus된 슬라이드의 review id 스토어에 업로드
    const currentReview = reviewList[swiper.activeIndex]
    if (currentReview) {
      updateFocusReview(currentReview.id)
    }
  }

  /** 슬라이드 클릭 함수 */
  const handleSlideClick = (index, path, item) => {
    // 클릭한 슬라이드가 acive 상태일 때 상세페이지로 이동
    if (index === activeIndex) {
      navigate(`${path}/${item.id}`)
    } else {
      // active 상태가 아닌 슬라이드 클릭 시 해당 슬라이드로 이동
      const swiper = document.querySelector('.swiper').swiper
      if (swiper) {
        swiper.slideTo(index)
      }
    }
  }

  return {
    handleSlideChange,
    handleSlideClick,
    slideNext,
    setSwiper,
  }
}
