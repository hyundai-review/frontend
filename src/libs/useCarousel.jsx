import useStoryStore from '@/store/storyStore'
import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const useCarousel = (initialIndex = 1) => {
  const navigate = useNavigate()
  const [activeIndex, setActiveIndex] = useState(initialIndex) // Swiper 슬라이드의 순서(인덱스) 번호
  const [swiper, setSwiper] = useState(null)
  const reviewList = useStoryStore((state) => state.reviewList)
  const updateFocusReview = useStoryStore((state) => state.updateFocusReview)

  /** 다음 슬라이드로 이동하는 함수 */
  const slideNext = () => {
    if (swiper && !swiper.isEnd) {
      swiper.slideTo(activeIndex + 1)
    } else if (activeIndex === reviewList.length - 1) {
      navigate('/')
    }
  }

  /** 슬라이드 index 바꾸는 함수 */
  const handleSlideChange = (swiper) => {
    setActiveIndex(swiper.activeIndex)

    // 현재 focus된 슬라이드의 review id 스토어에 업로드
    const currentReview = reviewList[swiper.activeIndex]
    if (currentReview) {
      // const currentReview = reviewList[swiper.activeIndex]
      updateFocusReview(currentReview.reviewId)
    }

    updateFocusReview(currentReview)
  }

  /** 슬라이드 클릭 함수 */
  // index 순서
  // item : reviewId, photocard
  const handleSlideClick = (index, path, item) => {
    // console.log('클릭한 슬라이드', item, item.reviewId)

    // 클릭한 슬라이드가 acive 상태일 때 상세페이지로 이동
    if (index === activeIndex) {
      updateFocusReview(index) // 포커스 된 리뷰 업데이트

      if (item) {
        navigate(`${path}/${item.reviewId}`)
      } else {
        navigate(`${path}`)
      }
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
