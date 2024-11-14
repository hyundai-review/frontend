import React from 'react'
import { useState, useEffect, useRef } from 'react'
// bodyPix: TensorFlow.js 기반 인물 분할(세그멘테이션) 모델
import * as bodyPix from '@tensorflow-models/body-pix'
import '@tensorflow/tfjs'
import styled from 'styled-components'
import 'react-resizable/css/styles.css'
import 'swiper/css'
import useReviewStore from '@/store/reviewStore'

function MyTest() {
  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const modelRef = useRef(null)

  // 실시간 비디오 처리 및 렌더링
  const renderVideo = async () => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    // 사람 감지
    const segmentation = await modelRef.current.segmentPerson(videoRef.current)

    // 마스크 생성
    const mask = bodyPix.toMask(
      segmentation,
      { r: 0, g: 0, b: 0, a: 255 }, // 인물
      { r: 0, g: 0, b: 0, a: 0 }, // 배경
    )

    // 비디오 프레임을 캔버스에 그리기
    ctx.drawImage(videoRef.current, 0, 0)

    // 마스크 적용
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    for (let i = 0; i < mask.data.length; i += 4) {
      imageData.data[i + 3] = mask.data[i + 3]
    }
    ctx.putImageData(imageData, 0, 0)

    // 다음 프레임 요청
    requestAnimationFrame(renderVideo)
  }

  // 사진 촬영
  const takePhoto = () => {
    const canvas = canvasRef.current
    // 현재 캔버스의 내용을 이미지로 변환
    const imageData = canvas.toDataURL('image/png')

    // 이미지 데이터를 사용하는 방법 (예시)
    // 1. 다운로드
    const link = document.createElement('a')
    link.download = 'photo.png'
    link.href = imageData
    link.click()

    // 2. 또는 이미지 데이터를 상태로 저장하거나 서버로 전송
    console.log('Photo taken:', imageData)
  }

  // 초기 설정
  const init = async () => {
    await loadModel()
    await setupCamera()

    // 비디오 메타데이터 로드 완료 대기
    videoRef.current.onloadedmetadata = () => {
      const video = videoRef.current
      canvasRef.current.width = video.videoWidth
      canvasRef.current.height = video.videoHeight

      // 실시간 렌더링 시작
      renderVideo()
    }
  }

  useEffect(() => {
    init()
  }, [])

  return (
    <div>
      <video ref={videoRef} autoPlay playsInline style={{ display: 'none' }} />
      <canvas ref={canvasRef} />
      <button onClick={takePhoto}>Take Photo</button>
    </div>
  )
}

export default MyTest
