import React, { useEffect, useRef } from 'react'
import { useParams, Outlet, useNavigate, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import * as S from '@/styles/background'
import useReviewStore from '@/store/reviewStore'
import MobileStepper from '@mui/material/MobileStepper'
import BACK from '@/assets/icons/arrow-left.svg?react'
import media from '@/styles/media'

function ReviewPostPage() {
  const { movieId } = useParams()
  const {
    reviewStep,
    prevStep,
    resetStore,
    setNavi,
    setReviewStep,
    currentMovieId,
    backgroundImg,
    reviewPostMovieId,
    setReviewPostMovieId,
  } = useReviewStore()
  const navigate = useNavigate()
  const location = useLocation()

  // store에 navigate 함수 저장
  useEffect(() => {
    setNavi(navigate)
  }, [navigate, setNavi])

  // 다른 영화의 리뷰 페이지로 이동할 때만 데이터 초기화
  useEffect(() => {
    if (reviewPostMovieId == null) {
      setReviewPostMovieId(currentMovieId)
    } else if (reviewPostMovieId !== currentMovieId) {
      resetStore()
      // window.location.reload() // TODO 나중에 수정할 것
    }
  }, [location.pathname])

  // URL에서 현재 step 확인하여 프로그레스 바 업데이트
  useEffect(() => {
    const paths = ['text', 'photo', 'deploy', 'upload']
    const currentPath = location.pathname.split('/').pop()
    const stepIndex = paths.indexOf(currentPath)

    if (stepIndex !== -1) {
      setReviewStep(stepIndex)
    }
  }, [location.pathname, setReviewStep])

  return (
    <Container $image={backgroundImg}>
      <BlurOverlay>
        <Wrap>
          <TopWrap>
            {/* 단계 바 */}
            <MobileStepper
              variant='progress'
              steps={4}
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
          <OutletWrap>
            <Outlet />
          </OutletWrap>
        </Wrap>
      </BlurOverlay>
    </Container>
  )
}

export default ReviewPostPage

// const Container = styled.div`
//   width: 100vw;
//   height: 100vh;
//   background: ${(props) => `url(${props.$image})`};
//   background-size: cover;
//   background-position: center;
//   background-repeat: no-repeat;
// `
const Container = styled.div`
  min-height: 100vh;
  /* height: auto; */
  background: ${(props) => `url(${props.$image})`};
  background-size: cover;
  background-position: center;

  background-attachment: fixed;
`

const BlurOverlay = styled.div`
  width: 100%;
  min-height: 100vh;
  /* height: auto; */
  /* height: 100%; */
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(20px);

  display: flex;
  justify-content: center;
  align-items: center;
`

const Wrap = styled.div`
  padding: 25px 0;
  box-sizing: border-box;

  //
  height: 100%;
  /* min-height: 100vh; */
  min-height: calc(100vh - 50px); // 중요!
  display: flex;
  flex-direction: column;
  //

  width: calc(100% - 240px);
  margin: 0 auto;
  min-width: 362px;
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

const OutletWrap = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  /* overflow-y: auto; */
  min-height: 0;
`
