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
import block from '@/assets/icons/block.svg'
import { isLoggedIn } from '@/utils/logInManager'
function Stories({ dataList, path }) {
  const { handleSlideChange, handleSlideClick } = useCarousel(1)
  const [isLogIn, setIsLogIn] = useState(isLoggedIn())
  const openModal = useModalStore((state) => state.openModal)
  const navigate = useNavigate()

  console.log('dataList', dataList)
  const handleClick = (index, path, review) => {
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
      {!isLogIn ? (
        <Wrap>
          <Content>
            <Icon src={block} />
            <Text>로그인하고 스토리 보기</Text>
          </Content>
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
              <SwiperSlide key={index} onClick={() => handleClick(index, path, review)}>
                <StoryItem photocardImg={review.photocard} reviewId={review.reveiwId} />
              </SwiperSlide>
            ))}
          </Swiper>
        </Wrap>
      ) : (
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
            <SwiperSlide key={index} onClick={() => handleClick(index, path, review)}>
              <StoryItem photocardImg={review.photocard} reviewId={review.reveiwId} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </SwiperContainer>
  )
}

export default Stories
const Wrap = styled.div`
  position: relative;
  overflow: hidden;

  // 불투명한 막 추가
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    backdrop-filter: blur(7px); // 블러 효과
    z-index: 2; // 가장 위에 표시
  }
`
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
const Icon = styled.img`
  width: 24px;
  height: 24px;
  margin-bottom: 10px;
`

const Content = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); /* 가운데 정렬 */
  display: flex;
  align-items: center;
  flex-direction: column; /* 아이콘과 텍스트 세로 정렬 */
  z-index: 3; /* 오버레이 위에 표시 */
  width: 100%;
`

const Text = styled.div`
  color: var(--gray-50, #fafafa);
  text-align: center;
  text-shadow: 0px 0px 10px var(--primary-solid-light, rgba(199, 125, 181, 0.5));

  /* regular/md */
  font-family: Pretendard;
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px; /* 150% */
`
