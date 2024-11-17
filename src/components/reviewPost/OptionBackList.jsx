import React, { useEffect, useState } from 'react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/effect-coverflow'
import styled from 'styled-components'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import OptionBackItem from './OptionBackItem'
import useReviewStore from '@/store/reviewStore'
import { useWindowSize } from '@/utils/useWindowSize'
import { useApi } from '@/libs/useApi'
import { useParams } from 'react-router-dom'
import { transformStillcut } from '@/utils/dataTransform'

function OptionBackList() {
  const { setOptionBackImg, optionBackImg } = useReviewStore()
  const { width } = useWindowSize() // 윈도우 크기 추적
  const isMobile = width <= 752
  const { get } = useApi()
  const [stillcut, setStillcut] = useState([])
  const { movieId } = useParams()

  useEffect(() => {
    // movie 포스터, 스틸컷 가져오기
    get(`/movies/images/${movieId}`).then((response) => {
      setStillcut(transformStillcut(response.data))
    })
  }, [])

  return (
    <SwiperContainer>
      <Swiper
        direction={isMobile ? 'horizontal' : 'vertical'}
        modules={[Navigation]}
        slidesPerView={isMobile ? 3.5 : 5.5}
        spaceBetween={isMobile ? 10 : 0}
      >
        {stillcut?.map((item, index) => (
          <SwiperSlide key={index}>
            <OptionBackItem backImg={item.imgURL} backImgId={item.imgId} />
          </SwiperSlide>
        ))}
      </Swiper>
    </SwiperContainer>
  )
}

export default OptionBackList

const SwiperContainer = styled.div`
  height: 100%;
  width: 100%;

  .swiper {
    height: 100%; // !! Swiper 자체의 높이를 100%로 설정
  }
  .swiper-slide {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  @media (max-width: 752px) {
    width: 100%;
    .swiper {
      height: 120px; // !! Swiper 자체의 높이를 100%로 설정
    }
  }
`
