import React, { useCallback, useEffect } from 'react'
import * as bodyPix from '@tensorflow-models/body-pix'
import '@tensorflow/tfjs'
import useReviewStore from '@/store/reviewStore'
import {
  useBackgroundImage,
  useCamera,
  useCanvas,
  useModel,
  useVideoProcessing,
} from '@/libs/useVideo'
import styled from 'styled-components'
import { usePhotoTimer } from '@/utils/usePhotoTimer'

function Photography({ setTakePhotoFunc }) {
  const { optionBackImg } = useReviewStore()

  const { modelReady, modelRef, loadModel } = useModel() // ML 모델 준비
  const { videoRef, dimensions, setupCamera } = useCamera() // 웹캠 설정
  const { canvasRef, offCanvasRef, offCtxRef, initializeCanvas } = useCanvas() // canvas 관리
  const backgroundImageObj = useBackgroundImage(optionBackImg.imgURL, dimensions) // 배경 이미지 관리

  // 비디오 처리
  const { renderVideo } = useVideoProcessing(
    videoRef,
    canvasRef,
    offCanvasRef,
    modelRef,
    backgroundImageObj,
    dimensions,
  )

  /** 초기화 */
  useEffect(() => {
    const initializePhotograpy = async () => {
      await loadModel() // 1. ML 모델 로드

      const video = await setupCamera() // 2. 웹캠 설정
      initializeCanvas(dimensions.width, dimensions.height) // 3. 캔버스 초기화
      renderVideo() // 4. 비디오 처리 시작
    }

    initializePhotograpy()
  }, [])

  const takePhoto = useCallback(() => {
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')
    canvas.width = dimensions.width
    canvas.height = dimensions.height
    context.drawImage(canvasRef.current, 0, 0)
    const imageData = canvas.toDataURL('image/png')
    console.log('Photo taken:', imageData)
    return imageData
  }, [dimensions, canvasRef])

  const { isTimerRunning, countdown, startTimer } = usePhotoTimer(takePhoto)

  // 상위 컴포넌트로 타이머 시작 함수 전달
  useEffect(() => {
    setTakePhotoFunc(() => startTimer)
  }, [setTakePhotoFunc, startTimer])

  return (
    <Container>
      {!modelReady ? (
        <div>model 로딩중</div>
      ) : (
        <Wrap>
          {isTimerRunning && (
            <TimerOverlay>
              <CountdownText>{countdown}</CountdownText>
            </TimerOverlay>
          )}

          <VideoWrap width={dimensions.width} height={dimensions.height}>
            <video ref={videoRef} autoPlay playsInline />
          </VideoWrap>
          <CanvasWrap>
            {/* 합성 결과 캔버스 */}
            <canvas ref={canvasRef} />
          </CanvasWrap>
        </Wrap>
      )}
    </Container>
  )
}

export default Photography

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`
const Wrap = styled.div`
  width: 100%;
  height: 100%;

  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`

const VideoWrap = styled.div`
  display: none;
  width: ${(props) => props.width}px; // dimensions.width
  height: ${(props) => props.height}px; // dimensions.height
  position: relative;

  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

const CanvasWrap = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  canvas {
    width: 100%;
    height: 100%;
    /* object-fit: cover; */
    object-fit: contain;
  }
`

const TimerOverlay = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
`

const CountdownText = styled.div`
  font-size: 120px;
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`
