import { useState, useEffect, useRef } from 'react'
// bodyPix: TensorFlow.js 기반 인물 분할(세그멘테이션) 모델
import * as bodyPix from '@tensorflow-models/body-pix'
import '@tensorflow/tfjs'
import styled from 'styled-components'
// Draggable: 요소를 드래그 가능하게 만드는 컴포넌트
import Draggable from 'react-draggable'
// ResizableBox: 요소의 크기를 조절 가능하게 만드는 컴포넌트
import { ResizableBox } from 'react-resizable'
import 'react-resizable/css/styles.css'
import 'swiper/css'

const Test = () => {
  const myImage = '/assets/images/movie/poster2.jpg'

  // 상태 관리
  const [modelReady, setModelReady] = useState(false) // ML 모델 로드 상태
  const [foregroundColor] = useState({ r: 0, g: 0, b: 0, a: 255 }) // 전경(사람) 마스크 색상
  const [backgroundColor] = useState({ r: 0, g: 0, b: 0, a: 0 }) // 배경 마스크 색상
  const [height, setHeight] = useState(480) // 캔버스 높이
  const [width, setWidth] = useState(640) // 캔버스 너비
  const [backgroundSrc, setBackgroundSrc] = useState(myImage) // 배경 이미지 소스
  const [processedImage, setProcessedImage] = useState(null) // 배경 제거된 이미지
  const [combinedImage, setCombinedImage] = useState(null) // 최종 합성 이미지
  const [isDraggingDisabled, setIsDraggingDisabled] = useState(false) // 드래그 가능 여부

  // Refs - DOM 요소 및 모델 참조
  const videoRef = useRef(null) // 웹캠 비디오 요소
  const canvasRef = useRef(null) // 메인 캔버스 요소
  const backgroundRef = useRef(null) // 배경 이미지 요소
  const offCanvasRef = useRef(null) // 오프스크린 캔버스 (이미지 처리용)
  const offCtxRef = useRef(null) // 오프스크린 캔버스 컨텍스트
  const modelRef = useRef(null) // bodyPix 모델
  const boxRef = useRef(null) // 리사이즈 박스 요소
  const backgroundImageRef = useRef(null) // 배경 이미지 요소 (합성용)

  // bodyPix 모델 로드
  const loadModel = async () => {
    setModelReady(false) // 로딩 상태 시작
    const model = await bodyPix.load() // 모델 로드
    modelRef.current = model // 모델 저장
    setModelReady(true) // 로딩 완료
  }

  // 웹캠 초기화 및 설정
  const setupCamera = async () => {
    // 웹캠 스트림 가져오기
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: false, // 오디오는 사용하지 않음
    })
    videoRef.current.srcObject = stream // 비디오 요소에 스트림 연결

    // 비디오 메타데이터 로드 완료 대기
    return new Promise((resolve) => {
      videoRef.current.onloadedmetadata = () => {
        resolve(videoRef.current)
      }
    })
  }

  // 실시간 비디오 처리 및 렌더링
  const renderVideo = async () => {
    const model = modelRef.current
    const ctx = canvasRef.current.getContext('2d')
    const background = backgroundRef.current
    const video = videoRef.current

    // 비디오에서 사람 영역 감지
    const segmentation = await model.segmentPerson(video, {
      flipHorizontal: false,
      internalResolution: 'medium', // 성능과 품질의 균형
      segmentationThreshold: 0.7, // 사람 인식 임계값
    })

    // 감지된 사람 영역을 마스크로 변환
    const personMasked = bodyPix.toMask(segmentation, foregroundColor, backgroundColor)

    // 배경 이미지 크기 조정 계산
    const canvasWidth = 640
    const canvasHeight = 480
    const imgWidth = background.width
    const imgHeight = background.height
    const imgAspect = imgWidth / imgHeight
    const canvasAspect = canvasWidth / canvasHeight
    let drawWidth, drawHeight, drawX, drawY

    // 비율 유지하며 캔버스에 맞게 크기 조정
    if (imgAspect > canvasAspect) {
      drawWidth = canvasWidth
      drawHeight = canvasWidth / imgAspect
      drawX = 0
      drawY = (canvasHeight - drawHeight) / 2
    } else {
      drawHeight = canvasHeight
      drawWidth = canvasHeight * imgAspect
      drawY = 0
      drawX = (canvasWidth - drawWidth) / 2
    }

    // 배경 이미지 그리기
    if (background) {
      ctx.drawImage(background, drawX, drawY, drawWidth, drawHeight)
    }

    // 오프스크린 캔버스에서 마스킹 처리
    const offCanvas = offCanvasRef.current
    const offCtx = offCtxRef.current
    const oldGCO = offCtx.globalCompositeOperation // 현재 합성 모드 저장

    offCtx.clearRect(0, 0, width, height) // 캔버스 초기화
    offCtx.putImageData(personMasked, 0, 0) // 마스크 적용
    offCtx.globalCompositeOperation = 'source-in' // 합성 모드 변경
    offCtx.drawImage(video, 0, 0) // 비디오 프레임 그리기
    offCtx.globalCompositeOperation = oldGCO // 합성 모드 복원

    // 최종 이미지를 메인 캔버스에 그리기
    ctx.drawImage(offCanvas, 0, 0)

    // 다음 프레임 처리 예약
    requestAnimationFrame(renderVideo)
  }

  // 앱 초기화 및 설정
  const setupApp = async () => {
    await loadModel() // 모델 로드
    const video = await setupCamera() // 카메라 설정

    // 비디오 크기로 캔버스 설정
    const videoWidth = video.videoWidth
    const videoHeight = video.videoHeight
    setWidth(videoWidth)
    setHeight(videoHeight)

    // 캔버스 초기화
    const canvas = canvasRef.current
    canvas.width = videoWidth
    canvas.height = videoHeight

    // 오프스크린 캔버스 설정
    offCanvasRef.current = new OffscreenCanvas(videoWidth, videoHeight)
    offCtxRef.current = offCanvasRef.current.getContext('2d')

    renderVideo() // 렌더링 시작
  }

  // 배경 이미지 변경 핸들러
  const handleFileChange = (evt) => {
    const file = evt.target.files[0]
    const url = URL.createObjectURL(file)
    setBackgroundSrc(url)
  }

  // 사진 촬영
  const takePhoto = () => {
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')
    canvas.width = videoRef.current.videoWidth
    canvas.height = videoRef.current.videoHeight
    context.drawImage(videoRef.current, 0, 0)
    const imageData = canvas.toDataURL('image/png')
    removeBackground(imageData) // 배경 제거 처리
  }

  //api에 캠 화면 보내서 누끼 따는 코드 (추후 유료버전 쓸 경우 수정 필요)
  // PhotoRoom API를 사용한 배경 제거
  const removeBackground = async (imageData) => {
    // base64 이미지 데이터 추출
    const base64Image = imageData.split(',')[1]

    // PhotoRoom API 호출
    const response = await fetch('https://sdk.photoroom.com/v1/segment', {
      method: 'POST',
      headers: {
        'X-Api-Key': 'sandbox_62e1103902b3204f797f7b9f7293896462eebe92',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ image_file_b64: base64Image, size: 'auto' }),
    })

    if (!response.ok) {
      console.error('Error removing background:', response.statusText)
      return
    }

    // 응답 처리
    const blob = await response.blob()
    const url = URL.createObjectURL(blob)
    setProcessedImage(url) // 배경이 제거된 이미지 저장
  }

  // 이미지 합성 처리
  const combineImages = () => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    // 배경 이미지 로드
    const background = new Image()
    background.crossOrigin = 'Anonymous'
    background.src = '/src/movieImage.jpg'

    // 배경 이미지가 로드되면 실행
    background.onload = () => {
      // 캔버스 크기 설정
      canvas.width = 640
      canvas.height = 480
      ctx.drawImage(background, 0, 0, canvas.width, canvas.height)

      // 전경 이미지(사람) 로드
      const overlay = new Image()
      overlay.src = processedImage

      // 현재 리사이즈 박스와 배경 이미지의 위치/크기 정보 가져오기
      const resizeBox = boxRef.current.getBoundingClientRect()
      const bgImg = backgroundImageRef.current.getBoundingClientRect()

      // 전경 이미지가 로드되면 실행
      overlay.onload = () => {
        // 사용자가 조정한 위치와 크기로 이미지 합성
        ctx.drawImage(overlay, resizeBox.x, resizeBox.y - 300, resizeBox.width, resizeBox.height)
        // 합성된 이미지를 상태에 저장
        const combinedImage = canvas.toDataURL('image/png')
        setCombinedImage(combinedImage)
      }
    }
  }

  // 합성된 이미지 다운로드
  const downloadImage = () => {
    const link = document.createElement('a')
    link.href = combinedImage
    link.download = 'combined_image.png'
    link.click()
  }

  // 컴포넌트 마운트시 앱 초기화
  useEffect(() => {
    setupApp()
  }, [])

  // UI 렌더링
  return (
    <div>
      {/* 모델 로딩 중이면 로딩 메시지 표시 */}
      {!modelReady ? (
        <div>Loading model, please wait...</div>
      ) : (
        <div className='container-fluid'>
          {/* 웹캠과 배경 이미지 영역 */}
          <div className='row'>
            {/* 숨겨진 웹캠 비디오 */}
            <div className='webcam-source col-sm'>
              <video
                ref={videoRef}
                height={height}
                width={width}
                autoPlay
                style={{ display: 'none' }}
                playsInline
              ></video>
            </div>
            {/* 배경 이미지 영역 */}
            <div className='background col-sm'>
              <img
                src={backgroundSrc}
                alt='background'
                height={height}
                width={width}
                ref={backgroundRef}
              />
              <input type='file' onChange={handleFileChange} />
            </div>
          </div>

          {/* 실시간 합성 결과를 보여주는 캔버스 */}
          <div className='row'>
            <div className='output col-sm center-content'>
              <canvas ref={canvasRef} height={height} width={width}></canvas>
            </div>
          </div>

          {/* 사진 촬영 버튼 */}
          <button onClick={takePhoto}>Take Photo</button>

          {/* 배경 제거 후 이미지 편집 영역 */}
          <div>
            {processedImage && (
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <Container>
                  <BackgroundImage
                    ref={backgroundImageRef}
                    src='/src/movieImage.jpg'
                    alt='Background'
                  />
                  {/* 드래그 가능한 영역 */}
                  <Draggable
                    disabled={isDraggingDisabled}
                    defaultPosition={{ x: 0, y: 0 }}
                    bounds='parent'
                  >
                    {/* 크기 조절 가능한 영역 */}
                    <ResizableBox
                      width={640}
                      height={480}
                      minConstraints={[100, 100]}
                      maxConstraints={[640, 480]}
                      resizeHandles={['se', 'sw', 'nw', 'ne', 'n', 's', 'w', 'e']}
                      onResizeStart={(e) => {
                        e.stopPropagation()
                        setIsDraggingDisabled(true)
                      }}
                      onResizeStop={() => {
                        setIsDraggingDisabled(false)
                      }}
                    >
                      <div ref={boxRef} style={{ width: '100%', height: '100%' }}>
                        <OverlayImage src={processedImage} alt='Overlay' />
                      </div>
                    </ResizableBox>
                  </Draggable>
                </Container>
              </div>
            )}

            {/* 이미지 합성 버튼 */}
            <button onClick={combineImages}>Combine Images</button>

            {/* 최종 합성 이미지 표시 및 다운로드 */}
            {combinedImage && (
              <div>
                <h3>Combined Image</h3>
                <img src={combinedImage} alt='Combined' />
                <button onClick={downloadImage}>Download Combined Image</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

// 스타일 컴포넌트 정의
const Container = styled.div`
  position: relative;
  width: 640px;
  height: 480px;
`

const BackgroundImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: fill;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
`

const OverlayImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  cursor: pointer;
  z-index: 1;
`

export default Test
