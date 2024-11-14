import { useState, useEffect, useRef } from 'react'
import * as bodyPix from '@tensorflow-models/body-pix'
import '@tensorflow/tfjs'
import styled from 'styled-components'
import 'react-resizable/css/styles.css'
import { useNavigate } from 'react-router-dom'
import useReviewStore from '@/store/reviewStore'
import * as SBoxContainer from '@/styles/boxContainer'
import OptionBackList from '@/components/reviewPost/OptionBackList'

const movieData = {
  id: 1,
  image: [
    '/assets/images/movie/poster1.png',
    '/assets/images/movie/poster2.jpg',
    '/assets/images/movie/poster1.png',
  ],
}

/** step 2. 사진 촬영 */
function PostPhotoReview() {
  // const myImage = '/assets/images/movie/poster1.png' // 배경 이미지 경로
  // const navigate = useNavigate() // 페이지 간 이동을 위한 함수
  // const { reviewPost, reviewStep, nextStep, setNavi } = useReviewStore() // 리뷰 과정 상태 관리

  // // 상태 변수들
  // const [modelReady, setModelReady] = useState(false) // 모델이 로드되었는지 여부
  // const [foregroundColor] = useState({ r: 0, g: 0, b: 0, a: 255 }) // 사람 마스크의 색상
  // const [backgroundColor] = useState({ r: 0, g: 0, b: 0, a: 0 }) // 배경 마스크의 색상
  // const [height, setHeight] = useState(480) // 캔버스 높이
  // const [width, setWidth] = useState(640) // 캔버스 너비
  // const [backgroundSrc, setBackgroundSrc] = useState(myImage) // 배경 이미지 소스
  // const [processedImage, setProcessedImage] = useState(null) // 처리된 최종 이미지

  // // HTML 요소와 ML 모델을 위한 Ref
  // const videoRef = useRef(null) // 비디오 요소 (웹캠 피드)
  // const canvasRef = useRef(null) // 세그먼트 렌더링을 위한 캔버스 요소
  // const backgroundRef = useRef(null) // 배경 이미지 요소
  // const offCanvasRef = useRef(null) // 백그라운드 처리용 오프스크린 캔버스
  // const offCtxRef = useRef(null) // 오프스크린 캔버스의 컨텍스트
  // const modelRef = useRef(null) // 로드된 ML 모델

  // // 사람 세그먼트 모델 로드
  // const loadModel = async () => {
  //   setModelReady(false) // 모델 로딩 상태 설정
  //   const model = await bodyPix.load() // 모델 로드
  //   modelRef.current = model // 모델을 참조로 저장
  //   setModelReady(true) // 모델 준비 완료 상태 설정
  // }

  // // 웹캠을 설정하고 비디오 요소에 연결
  // const setupCamera = async () => {
  //   const stream = await navigator.mediaDevices.getUserMedia({
  //     video: true,
  //     audio: false, // 오디오 없이 비디오만
  //   })
  //   videoRef.current.srcObject = stream // 비디오 요소에 스트림 연결

  //   return new Promise((resolve) => {
  //     videoRef.current.onloadedmetadata = () => {
  //       resolve(videoRef.current) // 메타데이터 로드 후 비디오 요소 반환
  //     }
  //   })
  // }

  // // 실시간으로 비디오 렌더링 및 세그먼트 처리
  // const renderVideo = async () => {
  //   const model = modelRef.current // ML 모델 참조
  //   const ctx = canvasRef.current.getContext('2d') // 렌더링할 캔버스 컨텍스트
  //   const background = backgroundRef.current // 배경 이미지 참조
  //   const video = videoRef.current // 웹캠 피드 비디오 요소

  //   // 비디오 피드에서 사람 세그먼트 처리
  //   const segmentation = await model.segmentPerson(video, {
  //     flipHorizontal: false,
  //     internalResolution: 'medium', // 모델 성능 조정
  //     segmentationThreshold: 0.7, // 세그먼트 정확도 기준
  //   })

  //   const personMasked = bodyPix.toMask(segmentation, foregroundColor, backgroundColor) // 사람 영역 마스크 처리

  //   // 배경 이미지를 맞춤 설정해 배경에 그리기 위한 코드
  //   const canvasWidth = 640
  //   const canvasHeight = 480
  //   const imgWidth = background.width
  //   const imgHeight = background.height
  //   const imgAspect = imgWidth / imgHeight
  //   const canvasAspect = canvasWidth / canvasHeight
  //   let drawWidth, drawHeight, drawX, drawY
  //   if (imgAspect > canvasAspect) {
  //     drawWidth = canvasWidth
  //     drawHeight = canvasWidth / imgAspect
  //     drawX = 0
  //     drawY = (canvasHeight - drawHeight) / 2
  //   } else {
  //     drawHeight = canvasHeight
  //     drawWidth = canvasHeight * imgAspect
  //     drawY = 0
  //     drawX = (canvasWidth - drawWidth) / 2
  //   }
  //   if (background) {
  //     ctx.drawImage(background, drawX, drawY, drawWidth, drawHeight) // 배경 이미지를 캔버스에 맞춤
  //   }

  //   const offCanvas = offCanvasRef.current // 오프스크린 캔버스 참조
  //   const offCtx = offCtxRef.current // 오프스크린 캔버스의 context 참조
  //   const oldGCO = offCtx.globalCompositeOperation // 기존 글로벌 컴포지션 상태 저장

  //   offCtx.clearRect(0, 0, width, height) // 오프스크린 캔버스 초기화
  //   offCtx.putImageData(personMasked, 0, 0) // 사람 영역 마스크 그리기
  //   offCtx.globalCompositeOperation = 'source-in' // 소스-인으로 컴포지션 설정
  //   offCtx.drawImage(video, 0, 0) // 오프스크린에 웹캠 비디오 그리기
  //   offCtx.globalCompositeOperation = oldGCO // 원래 컴포지션 상태 복원

  //   ctx.drawImage(offCanvas, 0, 0) // 메인 캔버스에 최종 이미지 그리기

  //   requestAnimationFrame(renderVideo) // 반복 호출
  // }

  // // 앱 세팅 함수
  // const setupApp = async () => {
  //   await loadModel() // 모델 로드
  //   const video = await setupCamera() // 웹캠 설정
  //   const videoWidth = video.videoWidth
  //   const videoHeight = video.videoHeight
  //   setWidth(videoWidth)
  //   setHeight(videoHeight)

  //   const canvas = canvasRef.current
  //   canvas.width = videoWidth
  //   canvas.height = videoHeight
  //   offCanvasRef.current = new OffscreenCanvas(videoWidth, videoHeight)
  //   offCtxRef.current = offCanvasRef.current.getContext('2d')

  //   renderVideo() // 비디오 렌더링 시작
  // }

  // // 사진 촬영 함수
  // const takePhoto = () => {
  //   const canvas = document.createElement('canvas')
  //   const context = canvas.getContext('2d')
  //   canvas.width = videoRef.current.videoWidth
  //   canvas.height = videoRef.current.videoHeight
  //   context.drawImage(videoRef.current, 0, 0)
  //   const imageData = canvas.toDataURL('image/png') // 이미지 데이터 생성
  //   removeBackground(imageData) // 배경 제거 처리
  // }

  // ///////////////////////////
  // // 배경 제거 API 호출 함수
  // const removeBackground = async (imageData) => {
  //   const base64Image = imageData.split(',')[1]
  //   const response = await fetch('https://sdk.photoroom.com/v1/segment', {
  //     // API 요청
  //     method: 'POST',
  //     headers: {
  //       'X-Api-Key': 'sandbox_62e1103902b3204f797f7b9f7293896462eebe92',
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({ image_file_b64: base64Image, size: 'auto' }),
  //   })

  //   if (!response.ok) {
  //     console.error('Error removing background:', response.statusText)
  //     return
  //   }
  //   const blob = await response.blob() // 배경 제거된 이미지
  //   const url = URL.createObjectURL(blob)
  //   setProcessedImage(url) // 결과 이미지 저장
  // }

  // useEffect(() => {
  //   setupApp() // 컴포넌트 로드시 앱 세팅
  // }, [])

  return (
    // <div>
    //   {/* 모델이 로드되지 않았을 때 로딩 메시지를 표시 */}
    //   {!modelReady ? (
    //     <div>Loading model, please wait...</div>
    //   ) : (
    //     <div className='container-fluid'>
    //       {/* 웹캠 비디오와 배경 이미지를 보여주는 행 */}
    //       <div className='row'>
    //         {/* 웹캠 비디오 소스 - 화면에는 표시되지 않음(style: display: none) */}
    //         <div className='webcam-source col-sm'>
    //           <video
    //             ref={videoRef}
    //             height={height}
    //             width={width}
    //             autoPlay
    //             style={{ display: 'none' }}
    //             playsInline
    //           ></video>
    //         </div>

    //         {/* 선택된 배경 이미지를 표시하는 영역 */}
    //         <div className='background col-sm'>
    //           <img
    //             src={backgroundSrc}
    //             alt='background'
    //             height={height}
    //             width={width}
    //             ref={backgroundRef}
    //           />
    //         </div>
    //       </div>

    //       {/* 텐서플로우로 처리된 실시간 세그멘테이션 결과를 보여주는 캔버스 영역 */}
    //       <div className='row'>
    //         <div className='output col-sm'>
    //           <canvas ref={canvasRef} height={height} width={width}></canvas>
    //         </div>
    //       </div>
    //     </div>
    //   )}

    //   {/* 사진 촬영 버튼 */}
    //   <button onClick={takePhoto}>Take Photo</button>

    //   {/* 배경이 제거된 최종 처리 이미지 표시 영역 (현재 주석 처리됨) */}
    //   {/* {processedImage && <img src={processedImage} alt='Processed' />} */}
    // </div>
    <Container>
      <MainWrap>
        {/* 촬영 */}
        {/* <SBoxContainer.Box $width='700px' $height='610px'></SBoxContainer.Box> */}
        <PhotoWrap></PhotoWrap>
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
