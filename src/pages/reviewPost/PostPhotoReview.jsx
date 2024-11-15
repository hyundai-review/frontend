import { useState, useEffect } from 'react'
import styled from 'styled-components'
import 'react-resizable/css/styles.css'
import useReviewStore from '@/store/reviewStore'
import * as SBoxContainer from '@/styles/boxContainer'
import * as SBtn from '@/styles/button'
import * as SText from '@/styles/text'
import OptionBackList from '@/components/reviewPost/OptionBackList'
import Photography from '@/components/reviewPost/Photography'
import PHOTOBTN from '@/assets/icons/photoBtn.svg?react'
import { useNavigate } from 'react-router-dom'

// TODO (Y)촬영 버튼 클릭 시 소리 & 타이머 넣기

/** step 2. 사진 촬영 */
function PostPhotoReview() {
  const { optionBackImg, processPhotocard, setProcessPhotocard } = useReviewStore()
  const [takePhoto, setTakePhoto] = useState(null) // takePhoto 함수 저장용 state

  const handleTakePhoto = () => {
    if (takePhoto) {
      const imageData = takePhoto()

      // 여기서 이미지 데이터 처리
      setProcessPhotocard({
        step1: imageData,
      })
      // setProcessPhotocard((prev) => ({
      //   ...prev,
      //   step1: imageData,
      // }))
    }
  }

  const { reviewStep, nextStep } = useReviewStore()

  return (
    <Container>
      <MainWrap>
        {/* 촬영 */}
        <PhotoWrap>
          <Photography setTakePhotoFunc={setTakePhoto} />
        </PhotoWrap>

        {/* 스와이퍼 */}
        <OptionWrap>
          <OptionBackList />
        </OptionWrap>
      </MainWrap>
      {/* 촬영버튼 */}
      <SBoxContainer.Box
        $width='100%'
        $height='100px'
        $display='flex'
        $justifyContent='center'
        style={{
          position: 'relative',
          marginTop: '50px',
        }}
      >
        <IconBtn onClick={handleTakePhoto}>
          <PHOTOBTN />
        </IconBtn>

        <Preview $hasImage={!!processPhotocard.step1}>
          <img src={processPhotocard.step1} />
        </Preview>

        <NextBtn onClick={nextStep} disabled={!processPhotocard.step1}>
          <BtnText>다음</BtnText>
        </NextBtn>
      </SBoxContainer.Box>
    </Container>
  )
}

export default PostPhotoReview

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`
const MainWrap = styled.div`
  display: flex;
  justify-content: center;
  gap: 40px;

  width: 100%;
  height: 610px;
`
const Preview = styled.div`
  position: absolute;
  top: 3px;
  left: 10px;
  z-index: 10;
  border: ${({ $hasImage }) => ($hasImage ? '1px solid white' : 'none')};

  img {
    max-width: 100px;
    max-height: 90px;
  }
`

const PhotoWrap = styled.div`
  /* 중요 */
  width: 362px;
  height: 610px;
  background-color: black;
`
const OptionWrap = styled.div``

const IconBtn = styled(SBtn.IconButton)`
  circle[fill='#FAFAFA'] {
    transition: fill 0.3s ease-in-out;
  }

  &:hover circle[fill='#FAFAFA'] {
    fill: #b6b5ff;
    filter: drop-shadow(0px 0px 3px var(--primary-light-red, #ffd7d7));
  }
`
const BtnText = styled(SText.Text)`
  text-shadow: 0px 0px 10px var(--primary-solid, #c77db5);
`

const NextBtn = styled(SBtn.ReviewPostBtn)`
  position: absolute;
  top: 29px;
  right: 50px;
  z-index: 10;

  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
`
