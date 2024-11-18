import { useState, useRef, useEffect } from 'react'
import * as bodyPix from '@tensorflow-models/body-pix'

/** ML 모델 */
export const useModel = () => {
  const [modelReady, setModelReady] = useState(false) // 모델 준비 여부
  const modelRef = useRef(null) // bodyPix 모델

  const loadModel = async () => {
    try {
      setModelReady(false)
      modelRef.current = await bodyPix.load()
      setModelReady(true)
    } catch (error) {
      console.error('모델 로딩 실패', error)
      setModelReady(false)
    }
  }

  return { modelReady, modelRef, loadModel }
}

/** 웹캠 */
export const useCamera = () => {
  const [dimensions] = useState({ width: 362, height: 429.75 })
  const videoRef = useRef(null)

  const setupCamera = async () => {
    try {
      // 먼저 기본 스트림을 가져옴
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      })

      if (videoRef.current) {
        videoRef.current.srcObject = stream

        // 비디오 요소의 크기를 CSS로 조정
        videoRef.current.style.width = `${dimensions.width}px`
        videoRef.current.style.height = `${dimensions.height}px`

        return new Promise((resolve) => {
          videoRef.current.onloadedmetadata = () => {
            resolve(videoRef.current)
          }
        })
      }
    } catch (error) {
      console.error('카메라 셋업 실패:', error)
    }
  }

  return { videoRef, dimensions, setupCamera }
}

/** 캔버스
 * 메인 캔버스: 최종 결과물 표시
 * 오프스크린 캔버스: 이미지 처리용 임시 캔버스
 */
export const useCanvas = () => {
  const canvasRef = useRef(null) // <canvas> 요소
  const offCanvasRef = useRef(null) // 화면에 직접 표시 X
  const offCtxRef = useRef(null) // 캔버스에 그림 그리기 위한 인터페이스 : getContext('2d') 메서드 통해 얻기

  //  canvasRef, offCanvasRef, offCtxRef 크기 설정
  const initializeCanvas = (width, height) => {
    const canvas = canvasRef.current
    canvas.width = width
    canvas.height = height

    offCanvasRef.current = new OffscreenCanvas(width, height)
    offCtxRef.current = offCanvasRef.current.getContext('2d')
  }

  return { canvasRef, offCanvasRef, offCtxRef, initializeCanvas }
}

/** 배경 이미지 */
export const useBackgroundImage = (imageUrl, dimensions) => {
  const backgroundImageObj = useRef(null)

  useEffect(() => {
    if (!imageUrl || !dimensions.width || !dimensions.height) return

    const img = new Image()
    img.crossOrigin = 'anonymous'

    // TMDB 이미지 URL에서 파일 경로만 추출

    img.onload = () => {
      backgroundImageObj.current = img
      // 이미지 크기를 부모 컨테이너 크기로 설정
      img.width = dimensions.width
      img.height = dimensions.height
    }

    // console.log('dd', imageUrl)
    img.src = imageUrl
  }, [imageUrl, dimensions])

  return backgroundImageObj
}
// export const useBackgroundImage = (imageUrl, dimensions) => {
//   const backgroundImageObj = useRef(null)

//   useEffect(() => {
//     if (!imageUrl || !dimensions.width || !dimensions.height) {
//       console.log('Missing required props:', { imageUrl, dimensions })
//       return
//     }

//     const img = new Image()
//     img.crossOrigin = 'anonymous'

//     img.onload = () => {
//       console.log('Image loaded successfully')
//       backgroundImageObj.current = img
//     }

//     img.onerror = (error) => {
//       console.error('Error loading image:', error)
//     }

//     // 이미지 로드 시작 전에 로그
//     console.log('Starting to load image from URL:', imageUrl)
//     img.src = imageUrl
//   }, [imageUrl, dimensions])

//   return backgroundImageObj
// }

/** 비디오 처리 통합 */
export const useVideoProcessing = (
  videoRef,
  canvasRef,
  offCanvasRef,
  modelRef,
  backgroundImageObj,
  dimensions,
) => {
  // 캔버스에 배경 이미지 배치
  const drawBackground = (ctx, background, dimensions) => {
    // ctx : 캔버스의 2D 컨텍스트
    // dimensions: { width, height }

    const { width: canvasWidth, height: canvasHeight } = dimensions
    const imgWidth = background.width
    const imgHeight = background.height
    const imgAspect = imgWidth / imgHeight
    const canvasAspect = canvasWidth / canvasHeight
    let drawWidth, drawHeight, drawX, drawY

    if (imgAspect > canvasAspect) {
      // 이미지의 비율이 캔버스보다 넓은지, 좁은지 판단
      // 이미지의 비율이 더 크다면 이미지의 너비를 캔버스 너비에 맞추고 높이는 비율에 맞춰 조정
      drawWidth = canvasWidth
      drawHeight = canvasWidth / imgAspect
      drawX = 0
      drawY = (canvasHeight - drawHeight) / 2
    } else {
      // 이미지의 높이를 캔버스 높이에 맞추고 너비는 비율에 맞춰 조정
      drawHeight = canvasHeight
      drawWidth = canvasHeight * imgAspect
      drawY = 0
      drawX = (canvasWidth - drawWidth) / 2
    }

    ctx.drawImage(background, drawX, drawY, drawWidth, drawHeight)
  }

  // 마스킹 및 합성
  // 비디오의 특정 부분을 마스킹하여 합성 : 비디오의 인물 부분만 남기고, 나머지 배경은 제거
  const applyMaskAndComposite = (offCtx, personMasked, video, dimensions) => {
    // offCtx: 오프스크린 캔버스의 2D 컨텍스트
    // personMasked: 비디오에서 인물 부분만을 나타내는 마스크 이미지 데이터
    // video: 비디오 객체
    // dimensions: { width, height }

    const { width, height } = dimensions
    const oldGCO = offCtx.globalCompositeOperation

    offCtx.clearRect(0, 0, width, height) // 캔버스 초기화
    offCtx.putImageData(personMasked, 0, 0) // 마스크 이미지 배치
    offCtx.globalCompositeOperation = 'source-in' // 캔버스에 남아 있는 마스크된 부분과 겹치는 비디오의 부분만 보이도록
    offCtx.drawImage(video, 0, 0) // (0, 0) 좌표에 비디오 프레임을 그리기 : 마스크된 인물 부분만이 비디오로 덮여 보이게 하기
    offCtx.globalCompositeOperation = oldGCO // 값 복구
  }

  // 세그멘테이션 처리
  // model을 사용하여 비디오의 인물 세그멘테이션(분할)을 처리하고, 마스킹 데이터를 생성하여 캔버스에 인물을 따로 표시
  const processSegmentation = async (model, video, canvas) => {
    // model: 사람을 인식하고 분리할 수 있는 머신러닝 모델 객체
    const ctx = canvas.getContext('2d') // 세그멘테이션 결과를 표시

    // 비디오에서 사람을 식별하고 분리 -> segmentation 변수에 담기
    const segmentation = await model.segmentPerson(video, {
      flipHorizontal: false,
      internalResolution: 'medium',
      segmentationThreshold: 0.7,
    })

    // 세그멘테이션 결과를 바탕으로 사람의 영역에 해당하는 마스크 이미지를 생성
    const personMasked = bodyPix.toMask(
      segmentation,
      { r: 0, g: 0, b: 0, a: 255 }, // 인물 부분을 검은색, 불투명 설정
      { r: 0, g: 0, b: 0, a: 0 }, // 배경 부분을 투명하게 설정하여 인물만 표시
    )

    return { personMasked, ctx }
  }

  const renderVideo = async () => {
    // 모델, 비디오, 캔버스 준비
    if (!modelRef.current || !videoRef.current || !canvasRef.current) return

    // 세그먼테이션 작업
    const { personMasked, ctx } = await processSegmentation(
      modelRef.current,
      videoRef.current,
      canvasRef.current,
    )

    // 배경 이미지 그리기
    if (backgroundImageObj.current) {
      drawBackground(ctx, backgroundImageObj.current, dimensions)
    }

    // 마스킹 및 합성
    const offCtx = offCanvasRef.current.getContext('2d')
    applyMaskAndComposite(offCtx, personMasked, videoRef.current, dimensions)

    // 최종 합성
    ctx.drawImage(offCanvasRef.current, 0, 0)

    requestAnimationFrame(renderVideo)
  }

  return { renderVideo }
}
