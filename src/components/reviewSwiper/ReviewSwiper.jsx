import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import Stories from '../story/Stories'
import media from '@/styles/media'
import { useNavigate } from 'react-router-dom'
import useModalStore from '@/store/modalStore'
import { data } from '@tensorflow/tfjs'

function ReviewSwiper({ dataList }) {
  const navigate = useNavigate()
  const { openModal } = useModalStore()
  const [isFull, setIsFull] = useState(true)
  const swiperRef = useRef(null)
  const handleSlideClick = (item) => {
    console.log('슬라이드클릭 >>> ', item)
    // 모달 열기
    openModal('photoCard', {
      photocard: {
        image: item.photocard,
        name: item.movieTitle,
      },
    })
  }

  useEffect(() => {
    const checkSwiperLength = swiperRef.current?.swiper
    if (checkSwiperLength) {
      const isSwipeable = checkSwiperLength.isBeginning && checkSwiperLength.isEnd
      setIsFull(isSwipeable)
    }
    console.log('reviewSwiper > ', dataList.photocard)
  }, [dataList])
  return (
    <div>
      <SwiperWrapper $isFull={isFull}>
        <Swiper style={{ margin: 0 }} slidesPerView={'auto'} ref={swiperRef}>
          {dataList.map(
            (review, index) =>
              review.photocard && (
                <SwiperSlide
                  key={index}
                  onClick={() => handleSlideClick(review)}
                  style={{ width: 250 }}
                >
                  <ImageSlideWrap>
                    <ImageSlide $imageurl={review.photocard}>
                      <ImageText>{'여기는 나중에 대체됨'}</ImageText>
                    </ImageSlide>
                  </ImageSlideWrap>
                </SwiperSlide>
              ),
          )}
        </Swiper>
      </SwiperWrapper>
      <StoriesWrapper>
        <Stories dataList={dataList} />
      </StoriesWrapper>
    </div>
  )
}

const ImageSlideWrap = styled.div`
  padding: 20px;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(0, 0, 0, 0.25);
  width: fit-content;
`
const ImageSlide = styled.div`
  position: relative;
  border-radius: 5px;
  width: 200px;
  height: 200px;
  background: url(${(props) => props.$imageurl}) lightgray 50% / cover no-repeat;
`

const SwiperWrapper = styled.div`
  display: flex;
  position: relative;
  justify-content: flex-start;
  align-items: flex-start;
  ${media.small`
        display:none
    `}
  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 5%;
    height: ${(props) => (props.$isFull ? 0 : 100)}%;
    background: linear-gradient(to left, rgba(0, 0, 0, 1), rgba(255, 255, 255, 0));
    z-index: 1;
  }
`

const StoriesWrapper = styled.div`
  display: none;
  ${media.small`
    display:flex
  `}
  justify-content: center;
`

export default ReviewSwiper
