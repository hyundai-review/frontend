import useReviewStore from '@/store/reviewStore'
import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import * as SBoxContainer from '@/styles/boxContainer'
import * as SText from '@/styles/text'
import * as SBtn from '@/styles/button'
import { useHtml2Canvas } from '@/libs/useHtml2canvas'

/** step 3. 사진 자막 배치 */
const PostDeployReview = () => {
  const { processPhotocard, setProcessPhotocard, nextStep } = useReviewStore()
  const [subtitle, setSubtitle] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const canvasRef = useRef(null)
  const { generateImage } = useHtml2Canvas()

  const handleGeneratePhotocard = async () => {
    if (isGenerating || !processPhotocard.step1) return
    setIsGenerating(true)

    try {
      const generatedImage = await generateImage(canvasRef, processPhotocard.step1, subtitle)

      if (generatedImage) {
        setProcessPhotocard({
          step2: generatedImage,
        })

        console.log('ddddd', processPhotocard)
        nextStep()
      } else {
        throw new Error('이미지 생성 실패')
      }
    } catch (error) {
      console.error('포토카드 생성 중 오류 발생:', error)
      alert('이미지 생성 실패')
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <Container>
      <Wrap>
        <div>
          <PhotoWrap>
            <BackImg $backImg={processPhotocard.step1}>
              {subtitle && <SubtitlePreview>{subtitle}</SubtitlePreview>}
            </BackImg>
          </PhotoWrap>

          <SBoxContainer.Box
            $width='100%'
            $height='80px'
            $minWidth='362px'
            style={{ marginTop: '10px' }}
          >
            <SText.TextArea
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              placeholder='포토카드에 넣을 자막을 입력해보세요'
              $variant='md'
              $color='var(--gray-200)'
              disabled={isGenerating}
            />
          </SBoxContainer.Box>
        </div>

        <BtnWrap>
          <SBtn.ReviewPostBtn
            onClick={handleGeneratePhotocard}
            disabled={isGenerating || !processPhotocard.step1}
          >
            <BtnText>{isGenerating ? '카드 생성 중...' : '포토카드 만들기'}</BtnText>
          </SBtn.ReviewPostBtn>
        </BtnWrap>
      </Wrap>

      {/* 캔버스 */}
      <HiddenCanvas ref={canvasRef} />
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

const SubtitlePreview = styled.div`
  position: absolute;
  bottom: 30px;
  left: 0;
  width: 100%;
  text-align: center;
  color: white;
  font-size: 20px;
  text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.8);
  z-index: 10;
  padding: 0 10px;
  word-wrap: break-word;
  font-family: 'ASinemaB';
  line-height: 1.3;
`

const HiddenCanvas = styled.canvas`
  display: none;
`
