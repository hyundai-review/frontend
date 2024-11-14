import { useState, useEffect, useRef } from 'react'
import * as bodyPix from '@tensorflow-models/body-pix'
import '@tensorflow/tfjs'
import styled from 'styled-components'
import 'react-resizable/css/styles.css'
import { useNavigate } from 'react-router-dom'
import useReviewStore from '@/store/reviewStore'
import * as SBoxContainer from '@/styles/boxContainer'
import OptionBackList from '@/components/reviewPost/OptionBackList'
import Photography from '@/components/reviewPost/Photography'
import MyTest from './mytest'
import Test from './test'
/** step 2. 사진 촬영 */
function PostPhotoReview() {
  const { optionBackImg } = useReviewStore()
  useEffect(() => {
    console.log('dddddd', optionBackImg)
  }, [optionBackImg])

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
    </Container>
  )
}

export default PostPhotoReview

const Container = styled.div`
  border: 1px solid black;
  width: 100%;
`

const MainWrap = styled.div`
  display: flex;
  justify-content: center;
  gap: 40px;
  width: 100%;
  height: 610px;
`
const PhotoWrap = styled.div`
  width: 700px;
  height: 610px;
  background-color: aliceblue;
`
const OptionWrap = styled.div`
  /* height: 100%; */
`
