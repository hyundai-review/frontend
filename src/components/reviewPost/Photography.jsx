import React, { useEffect } from 'react'
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

function Photography() {
  const { optionBackImg } = useReviewStore()

  const { modelReady, modelRef, loadModel } = useModel() // ML 모델 준비
  const { videoRef, dimensions, setupCamera } = useCamera() // 웹캠 설정
  const { canvasRef, offCanvasRef, offCtxRef, initializeCanvas } = useCanvas() // canvas 관리
  const backgroundImageObj = useBackgroundImage(optionBackImg.imgURL) // 배경 이미지 관리
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

  const takePhoto = () => {
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')
    canvas.width = dimensions.width
    canvas.height = dimensions.height
    context.drawImage(canvasRef.current, 0, 0)
    const imageData = canvas.toDataURL('image/png')
    console.log('Photo taken:', imageData)
    // 여기서 이미지 데이터를 원하는 대로 처리
  }

  return (
    <Container>
      {!modelReady ? (
        <div>model 로딩중</div>
      ) : (
        <div className='container-fluid'>
          {/* 웹캠 비디오 : ML 모델이 해당 비디오 데이터를 분석해서 사람 인식 */}
          <div style={{ display: 'none' }}>
            <video
              ref={videoRef}
              height={dimensions.height}
              width={dimensions.width}
              autoPlay
              playsInline
            />
          </div>

          {/* 합성 결과 캔버스 */}
          <div className='output col-sm center-content'>
            <canvas ref={canvasRef} height={dimensions.height} width={dimensions.width} />
          </div>
          <button onClick={takePhoto}>Take Photo</button>
        </div>
      )}
    </Container>
  )
}

export default Photography

const Container = styled.div`
  background-color: red;
`
