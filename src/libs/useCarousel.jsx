import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const useCarousel = (initialIndex = 1) => {
  const navigate = useNavigate()
  const [activeIndex, setActiveIndex] = useState(initialIndex)

  /** 슬라이드 index 바꾸는 함수 */
  const handleSlideChange = (swiper) => {
    setActiveIndex(swiper.activeIndex)
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
  }
}
