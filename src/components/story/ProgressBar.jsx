import * as React from 'react'
import Box from '@mui/material/Box'
import LinearProgress from '@mui/material/LinearProgress'
import { useCarousel } from '@/libs/useCarousel'

export const ProgressBar = ({ slideNext }) => {
  const [progress, setProgress] = React.useState(0)

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        // 프로세스 100%
        if (oldProgress === 100) {
          slideNext()
          return 0
        }
        // const diff = Math.random() * 10
        const diff = 30
        return Math.min(oldProgress + diff, 100)
      })
    }, 500)

    return () => {
      clearInterval(timer)
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
