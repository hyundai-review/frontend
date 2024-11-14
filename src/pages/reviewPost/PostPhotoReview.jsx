import { useState, useEffect } from 'react'
import '@tensorflow/tfjs'
import styled from 'styled-components'
import 'react-resizable/css/styles.css'
import { useNavigate } from 'react-router-dom'
import useReviewStore from '@/store/reviewStore'
import * as SBoxContainer from '@/styles/boxContainer'
import * as SBtn from '@/styles/button'
import OptionBackList from '@/components/reviewPost/OptionBackList'
import Photography from '@/components/reviewPost/Photography'
import PHOTOBTN from '@/assets/icons/photoBtn.svg?react'

/** step 2. 사진 촬영 */
function PostPhotoReview() {
  const { optionBackImg } = useReviewStore()
  const [takePhoto, setTakePhoto] = useState(null) // takePhoto 함수 저장용 state

  const [testImg, setTestImg] = useState('')

  useEffect(() => {
    console.log('dddddd', optionBackImg)
  }, [optionBackImg])

  const handleTakePhoto = () => {
    if (takePhoto) {
      const imageData = takePhoto()
      // 여기서 이미지 데이터 처리
      // console.log('imageData', imageData)
      setTestImg(imageData)
    }
  }

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

        <img src={testImg} />
      </MainWrap>

      <SBoxContainer.Box $width='100%' $height='100px' $display='flex' $justifyContent='center'>
        <IconBtn onClick={handleTakePhoto}>
          <PHOTOBTN />
        </IconBtn>
      </SBoxContainer.Box>
    </Container>
  )
}

export default PostPhotoReview

const Container = styled.div`
  border: 1px solid black;
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

  margin: 30px 0;
`
const PhotoWrap = styled.div`
  /* 중요 */
  width: 700px;
  height: 610px;
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
