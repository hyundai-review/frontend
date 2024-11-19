import { useCallback, useEffect, useState } from 'react'

/** 타이머 기능
 * @param {() => void} onTimerComplete - 콜백은 타이머 완료 시 실행
 * @returns {{
 *   isTimerRunning: boolean, // 타이머 실행 여부
 *   countdown: number,       // 현재 카운트다운 숫자
 *   startTimer: () => void   // 타이머 시작 함수
 * }}
 */ export const usePhotoTimer = (onTimerComplete) => {
  const [isTimerRunning, setIsTimerRunning] = useState(false)
  const [countdown, setCountdown] = useState(3)

  const startTimer = useCallback(() => {
    return new Promise((resolve) => {
      setIsTimerRunning(true)
      setCountdown(3)

      // 타이머 완료 후 resolve 호출을 위한 함수
      const handleComplete = () => {
        if (onTimerComplete) {
          const result = onTimerComplete()
          resolve(result)
        }
      }

      // countdown이 0이 되면 handleComplete 호출
      const timerInterval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timerInterval)
            setIsTimerRunning(false)
            handleComplete()
            return 0
          }
          return prev - 1
        })
      }, 1000)
    })
  }, [onTimerComplete])

  return {
    isTimerRunning,
    countdown,
    startTimer,
  }
}
