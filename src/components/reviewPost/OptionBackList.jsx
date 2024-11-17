import React, { useEffect } from 'react'
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

const movieData = {
  id: 1,
  image: [
    {
      imgId: 1,
      imgURL: '/assets/images/movie/poster2.jpg',
    },
    {
      imgId: 2,
      imgURL: '/assets/images/movie/poster1.png',
    },
    {
      imgId: 3,
      imgURL:
        'https://cors-anywhere.herokuapp.com/https://image.tmdb.org/t/p/w780/xTE7Aba7nzFl9ldeD1erhbXYxkg.jpg',
    },
    {
      imgId: 4,
      imgURL: '/assets/images/movie/poster1.png',
    },
    {
      imgId: 5,
      imgURL: '/assets/images/movie/poster2.jpg',
    },
    {
      imgId: 6,
      imgURL: '/assets/images/movie/poster1.png',
    },
    {
      imgId: 7,
      imgURL: '/assets/images/movie/poster2.jpg',
    },
  ],
}

function OptionBackList() {
  const { setOptionBackImg } = useReviewStore()
  const { width } = useWindowSize() // 윈도우 크기 추적
  const isMobile = width <= 752

  useEffect(() => {
    if (movieData.image.length > 0) {
      setOptionBackImg({
        imgId: movieData.image[0].imgId,
        imgURL: movieData.image[0].imgURL,
      })
    }
  }, [])

  return (
    <SwiperContainer>
      <Swiper
        direction={isMobile ? 'horizontal' : 'vertical'}
        modules={[Navigation]}
        slidesPerView={isMobile ? 3.5 : 5.5}
        spaceBetween={isMobile ? 10 : 0}
      >
        {movieData.image.map((item, index) => (
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
