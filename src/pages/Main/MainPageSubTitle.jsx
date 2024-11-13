import React, { useEffect, useState } from 'react'

function MainPageSubTitle({ time }) {
  const setTime = (time) => {
    if (time < 5) {
      return '밤'
    } else if (time < 12) {
      return '아침'
    } else if (time < 18) {
      return '낮'
    } else if (time < 22) {
      return '저녁'
    } else {
      return '밤'
    }
  }
  const [timeText, setTimeText] = useState('')
  useEffect(() => {
    setTimeText(setTime(time))
  }, [time])

  return (
    <div>
      <p
        style={{
          color: `var(--color-gray-300)`,
          fontWeight: '100',
        }}
      >
        {`좋은 ${timeText}이에요! 어떤 영화 리뷰를 찾으시나요?`}
      </p>
    </div>
  )
}

export default MainPageSubTitle
