import useReviewStore from '@/store/reviewStore'
import React from 'react'
import Draggable from 'react-draggable'
import { ResizableBox } from 'react-resizable'
import styled from 'styled-components'
import * as SBoxContainer from '@/styles/boxContainer'
import * as SText from '@/styles/text'
import * as SBtn from '@/styles/button'

/** step 3. 사진 배치 */
function PostDeployReview() {
  const { optionBackImg, processPhotocard, setProcessPhotocard } = useReviewStore()
  const { nextStep } = useReviewStore()
  return (
    <Container>
      <Wrap>
        <div>
          {/* 포토카드 */}
          <PhotoWrap>
            <BackImg $backImg={processPhotocard.step1} />
          </PhotoWrap>

          {/* 자막 */}
          <SBoxContainer.Box
            $width='100%'
            $height='80px'
            $minWidth='362px'
            style={{ marginTop: '10px' }}
          >
            <SText.TextArea
              placeholder='포토카드에 넣을 자막을 입력해보세요'
              $variant='md'
              $color='var(--gray-200)'
            />
          </SBoxContainer.Box>
        </div>

        {/*  */}
        <BtnWrap>
          <SBtn.ReviewPostBtn onClick={nextStep}>
            <BtnText>포토카드 만들기</BtnText>
          </SBtn.ReviewPostBtn>
        </BtnWrap>
      </Wrap>
    </Container>
  )
}

export default PostDeployReview

const Container = styled.div`
  background: url(${(props) => props.$backImg}) no-repeat center center;
  background-size: cover;
  background-position: center center;
  object-fit: contain;
`
const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
`

const PhotoWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 362px;
  height: 429.75px;
`

const BackImg = styled.div`
  /* width: 100%;
  height: 100%;
  object-fit: fill;
  background: url(${(props) => props.$backImg}) no-repeat center center;
  background-size: cover; */
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
    background: url(${(props) => props.$backImg}) no-repeat center;
    background-size: contain;
  }
`
const BtnWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: right;
`

const BtnText = styled(SText.Text)`
  text-shadow: 0px 0px 10px var(--primary-solid, #c77db5);
`
