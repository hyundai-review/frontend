import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import block from '@/assets/icons/block.svg'
import { isLoggedIn } from '@/utils/logInManager'

//TODO(j) 로컬 스토리지 사용자 정보 훅으로 빼기
function StoryItem({ photocardImg, reviewId }) {
  const [isLogIn, setIsLogIn] = useState(isLoggedIn())
  useEffect(() => {
    // setIsLogIn(isLoggedIn())
    setIsLogIn(true)
  }, [])
  return (
    <ImgFrame>
      {/* ${reviewId} */}
      {!isLogIn && (
        <>
          <Overlay />
          <Content>
            <Icon src={block} />
            <Text>로그인하고 스토리 보기</Text>
          </Content>
        </>
      )}
      <Image src={photocardImg} alt={`Slide ${reviewId}`} />
    </ImgFrame>
    // <ImgFrame>
    //   {/* ${reviewId} */}
    //   <Overlay />
    //   <Content>
    //     <Icon src={block} />
    //     <Text>로그인하고 스토리 보기</Text>
    //   </Content>
    //   <Image src={photocardImg} alt={`Slide ${reviewId}`} />
    // </ImgFrame>
  )
}

export default StoryItem
const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2; /* 이미지보다 위에 배치 */
  border-radius: 5px;
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(5px);
`
const Wrap = styled.div`
  background-color: #fff;
`
const ImgFrame = styled.div`
  cursor: pointer;
  width: 240px;
  height: 240px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(5px);
`
const Image = styled.img`
  width: 200px;
  height: 200px;
  flex-shrink: 0;
  object-fit: cover;

  border-radius: 5px;
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
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px; /* 150% */
`
