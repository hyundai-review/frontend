import { useState } from "react"

export const useVideo = () => {
  const [modelReady, setModelReady] = useState(false) // 모델 로드 여부
  const [foregroundColor] = useState({ r: 0, g: 0, b: 0, a: 255 }) // 사람 마스크의 색상
}