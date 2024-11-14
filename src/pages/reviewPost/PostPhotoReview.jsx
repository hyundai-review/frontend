import { useState, useEffect, useRef } from 'react'
import * as bodyPix from '@tensorflow-models/body-pix'
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
import MyTest from './mytest'
import Test from './test'

/** step 2. 사진 촬영 */
function PostPhotoReview() {
  const { optionBackImg } = useReviewStore()
  useEffect(() => {
    console.log('dddddd', optionBackImg)
  }, [optionBackImg])

  const takePhoto = () => {}

  return (
    <Container>
      <MainWrap>
        {/* 촬영 */}
        <PhotoWrap>
          <Photography />
          {/* <Test /> */}
          {/* <MyTest /> */}
        </PhotoWrap>

        {/* 스와이퍼 */}
        <OptionWrap>
          <OptionBackList />
        </OptionWrap>
      </MainWrap>

      <SBoxContainer.Box $width='100%' $height='100px' $display='flex' $justifyContent='center'>
        <IconBtn onClick={takePhoto}>
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
  background-color: yellow;
  display: flex;
  flex-direction: column;
  /* gap: 78px; */
`

const MainWrap = styled.div`
  display: flex;
  justify-content: center;
  gap: 40px;
  width: 100%;
  height: 610px;
  background-color: violet;
  margin: 30px 0;
`
const PhotoWrap = styled.div`
  /* width: 700px; */
  /* height: 610px; */
  /* width: 362px;
  height: 429.75px; */
  background-color: aliceblue;
`
const OptionWrap = styled.div`
  /* height: 100%; */
`

const IconBtn = styled(SBtn.IconButton)`
  circle[fill='#FAFAFA'] {
    transition: fill 0.3s ease-in-out;
  }

  &:hover circle[fill='#FAFAFA'] {
    fill: #b6b5ff;
    filter: drop-shadow(0px 0px 3px var(--primary-light-red, #ffd7d7));
  }
`
