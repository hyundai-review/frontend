import * as React from 'react'
import Box from '@mui/material/Box'
import LinearProgress from '@mui/material/LinearProgress'
import { useCarousel } from '@/libs/useCarousel'

export const ProgressBar = ({ slideNext }) => {
  const [progress, setProgress] = React.useState(0)
  const frameRef = React.useRef()

  React.useEffect(() => {
    let lastTime = Date.now()

    const animate = () => {
      const currentTime = Date.now()
      const deltaTime = currentTime - lastTime

      if (deltaTime >= 100) {
        // 100ms마다 업데이트
        setProgress((oldProgress) => {
          if (oldProgress >= 100) {
            slideNext()
            return 0
          }
          // 더 작은 증가값 사용 (2)
          return Math.min(oldProgress + 2, 100)
        })
        lastTime = currentTime
      }

      frameRef.current = requestAnimationFrame(animate)
    }

    frameRef.current = requestAnimationFrame(animate)

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current)
      }
    }
  }, [slideNext])

  return (
    <Box>
      <LinearProgress
        variant='determinate'
        value={progress}
        sx={{
          bgcolor: '#333333',
          '& .MuiLinearProgress-bar': {
            background: 'rgba(255, 255, 255, 0.50)',
          },
          height: 10,
          borderRadius: 5,
        }}
      />
    </Box>
  )
}
// import * as React from 'react'
// import Box from '@mui/material/Box'
// import LinearProgress from '@mui/material/LinearProgress'
// import { useCarousel } from '@/libs/useCarousel'

// export const ProgressBar = ({ slideNext }) => {
//   const [progress, setProgress] = React.useState(0)

//   React.useEffect(() => {
//     const timer = setInterval(() => {
//       setProgress((oldProgress) => {
//         // 프로세스 100%
//         if (oldProgress === 100) {
//           slideNext()
//           return 0
//         }
//         // const diff = Math.random() * 10
//         const diff = 30
//         return Math.min(oldProgress + diff, 100)
//       })
//     }, 500)

//     return () => {
//       clearInterval(timer)
//     }
//   }, [slideNext])

//   return (
//     <Box>
//       <LinearProgress
//         variant='determinate'
//         value={progress}
//         sx={{
//           bgcolor: '#333333',
//           '& .MuiLinearProgress-bar': {
//             background: 'rgba(255, 255, 255, 0.50)',
//           },
//           height: 10,
//           borderRadius: 5,
//         }}
//       />
//     </Box>
//   )
// }
