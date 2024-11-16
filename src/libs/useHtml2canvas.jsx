// hooks/useHtml2Canvas.js
import { useCallback } from 'react'

export const useHtml2Canvas = () => {
  const generateImage = useCallback(async (canvasRef, imageFile, subtitle) => {
    const canvas = canvasRef.current
    if (!canvas || !imageFile) return null

    const ctx = canvas.getContext('2d')

    // 캔버스 크기 설정
    canvas.width = 362
    canvas.height = 429.75

    try {
      // 이미지 로드 및 그리기를 Promise로 래핑
      const drawImage = () => {
        return new Promise((resolve, reject) => {
          const img = new Image()

          img.onload = () => {
            // 캔버스 초기화
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            // 이미지를 캔버스 크기에 맞게 그리기
            const aspectRatio = img.width / img.height
            let drawWidth = canvas.width
            let drawHeight = canvas.width / aspectRatio

            if (drawHeight < canvas.height) {
              drawHeight = canvas.height
              drawWidth = canvas.height * aspectRatio
            }

            const x = (canvas.width - drawWidth) / 2
            const y = (canvas.height - drawHeight) / 2

            ctx.drawImage(img, x, y, drawWidth, drawHeight)

            if (subtitle && subtitle.trim()) {
              // 자막 스타일 설정
              ctx.fillStyle = 'white'
              ctx.font = '20px ASinemaB'
              ctx.textAlign = 'center'
              ctx.textBaseline = 'bottom'

              // 자막에 그림자 효과 추가
              ctx.shadowColor = 'rgba(0, 0, 0, 0.8)'
              ctx.shadowBlur = 2
              ctx.shadowOffsetX = 2
              ctx.shadowOffsetY = 2

              // 자막 여러 줄 처리
              const maxWidth = canvas.width - 40
              const lineHeight = 26
              const words = subtitle.split(' ')
              let line = ''
              let lines = []

              for (let i = 0; i < words.length; i++) {
                const testLine = line + (line ? ' ' : '') + words[i]
                const metrics = ctx.measureText(testLine)
                const testWidth = metrics.width

                if (testWidth > maxWidth && i > 0) {
                  lines.push(line)
                  line = words[i]
                } else {
                  line = testLine
                }
              }
              if (line) {
                lines.push(line)
              }

              // 자막 그리기
              const bottomPadding = 30
              lines.forEach((line, i) => {
                const y = canvas.height - bottomPadding - (lines.length - 1 - i) * lineHeight
                ctx.fillText(line, canvas.width / 2, y)
              })
            }

            // 이미지로 변환
            const generatedImage = canvas.toDataURL('image/jpeg', 1.0)
            // URL.revokeObjectURL(imageUrl) // 메모리 정리
            resolve(generatedImage)
          }

          img.onerror = (error) => {
            console.error('이미지 로드 실패:', error)
            // URL.revokeObjectURL(imageUrl) // 메모리 정리
            reject(new Error('이미지 로드 실패'))
          }

          // File을 URL로 변환
          if (imageFile instanceof File) {
            const imageUrl = URL.createObjectURL(imageFile)
            img.src = imageUrl
          } else if (typeof imageFile === 'string') {
            img.src = imageFile
          } else {
            reject(new Error('유효하지 않은 이미지 형식입니다.'))
          }
        })
      }

      const generatedImage = await drawImage()

      return generatedImage
    } catch (error) {
      console.error('이미지 생성 중 오류 발생:', error)
      throw error
    }
  }, [])

  return { generateImage }
}
