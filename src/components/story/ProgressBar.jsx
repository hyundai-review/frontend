import * as React from 'react'
import Box from '@mui/material/Box'
import LinearProgress from '@mui/material/LinearProgress'

export const ProgressBar = () => {
  const [progress, setProgress] = React.useState(0)

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          return 0
        }
        const diff = Math.random() * 10
        return Math.min(oldProgress + diff, 100)
      })
    }, 500)

    return () => {
      clearInterval(timer)
    }
  }, [])

  return (
    <Box>
      <LinearProgress
        variant='determinate'
        value={progress}
        sx={{
          bgcolor: '#333333', // 프로그레스 바의 배경색
          '& .MuiLinearProgress-bar': {
            background: 'rgba(255, 255, 255, 0.50)',
          },
          height: 10, // 높이
          borderRadius: 5, // 둥근 모서리
        }}
      />
    </Box>
  )
}
