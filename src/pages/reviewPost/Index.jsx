import React, { useEffect } from 'react'
import { useParams, Outlet, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import * as S from '@/styles/background'
import useReviewStore from '@/store/reviewStore'
import MobileStepper from '@mui/material/MobileStepper'
import BACK from '@/assets/icons/arrow-left.svg?react'
import media from '@/styles/media'

const movieData = {
  id: 1,
  image: '/assets/images/movie/poster1.png',
}

function ReviewPostPage() {
  const { movieId } = useParams()
  const { reviewStep, prevStep, setNavi } = useReviewStore()
  const navigate = useNavigate()
  // navigate 함수를 store에 설정
  useEffect(() => {
    setNavi((path) => navigate(path))
    return () => setNavi(null) // cleanup
  }, [navigate])

  return (
    <Container $image={movieData.image}>
      <S.BlurOverlay>
        <Wrap>
          <TopWrap>
            {/* 단계 바 */}
            <MobileStepper
              variant='progress'
              steps={2}
              position='static'
              activeStep={reviewStep}
              sx={{
                width: '100%',
                maxWidth: '100%',
                backgroundColor: 'transparent',
                padding: 0,
                //   스탭 바
                '& .MuiLinearProgress-root': {
                  width: '100%',
                  height: '8px',
                  background: 'rgba(255, 255, 255, 0.25)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '100px',
                  // 활성 바
                  '& .MuiLinearProgress-bar': {
                    background: 'rgba(255, 255, 255, 0.50)',
                    borderRadius: '100px',
                  },
                },
              }}
            />

            <BackBtn onClick={prevStep} disabled={reviewStep === 0}>
              <BACK />
            </BackBtn>
          </TopWrap>

          {/* 공통 */}
          <Outlet />
        </Wrap>
      </S.BlurOverlay>
    </Container>
  )
}

export default ReviewPostPage

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: ${(props) => `url(${props.$image})`};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`
const Wrap = styled.div`
  width: calc(100% - 240px);
  margin: 0 auto;
  min-width: 362px;
  /* width: 100%; */
  /* padding: 0 100px; */
  ${media.small`
    width: calc(100% - 100px);
  `}
`
const TopWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 12px;
  margin-bottom: 12px;
`
const BackBtn = styled.button`
  background: none;
  border: none;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  /* padding: 8px; */
  /* transition: opacity 0.2s; */

  /* &:hover {
    opacity: ${(props) => (props.disabled ? 0.5 : 0.8)};
  }

  svg {
    width: 24px;
    height: 24px;
    fill: white; // SVG 색상이 필요한 경우
  } */
`
