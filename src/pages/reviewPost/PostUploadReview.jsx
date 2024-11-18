import useReviewStore from '@/store/reviewStore'
import React from 'react'
import styled from 'styled-components'
import * as SText from '@/styles/text'
import * as SBtn from '@/styles/button'
import * as SBoxContainer from '@/styles/boxContainer'
import DOWNLOAD from '@/assets/icons/download.svg?react'
import { useApi } from '@/libs/useApi'
import { useParams } from 'react-router-dom'
import { transformReviewPost } from '@/utils/dataTransform'
import { objectToFormData } from '@/utils/objectToFormdata'
import useModalStore from '@/store/modalStore'

function PostUploadReview() {
  const { processPhotocard, reviewPost } = useReviewStore()
  const { post, error } = useApi()
  const { movieId } = useParams()
  const { openModal } = useModalStore()

  const handleDownload = async () => {
    try {
      // base64 이미지
      const link = document.createElement('a')
      link.href = processPhotocard.step2
      link.download = 'photocard.png' // 다운로드 파일명
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (error) {
      console.error('이미지 다운로드 실패:', error)
      alert('이미지 다운로드 실패')
    }
  }

  const handleSubmitReview = async (includeStory = false) => {
    if (!includeStory) {
      // 리뷰만 올리기
      try {
        const response = await post(`/reviews/${movieId}`, reviewPost)

        if (response.status === 200) {
          openModal('confirm', { message: '리뷰를 등록하시겠습니까?' }, () => {
            navigate(`/movie/${movieId}/detail`)
          })
        }
      } catch (err) {
        if (err.response?.status === 409) {
          openModal('alert', {
            message: '이미 리뷰를 작성하셨습니다.',
          })
        }
      }
    } else {
      // 스토리 게시
      const transformData = transformReviewPost(reviewPost, processPhotocard.step2)
      const formData = objectToFormData(transformData, {
        fileKeys: {
          photocard: 'photocard.jpg',
        },
      })
      try {
        const response = await post(`/reviews/${movieId}`, formData, true)

        if (response.status === 200) {
          openModal('confirm', { message: '포토리뷰를 등록하시겠습니까?' }, () => {
            navigate(`/movie/${movieId}/detail`)
          })
        }
      } catch (err) {
        if (err.response?.status === 409) {
          openModal('alert', {
            message: '이미 리뷰를 작성하셨습니다.',
          })
        }
      }
    }
  }

  return (
    <Container>
      <Wrap>
        <PhotoWrap>
          <img src={processPhotocard.step2} />
        </PhotoWrap>

        <BottomWrap>
          <SBoxContainer.Box
            // $width='280px'
            $minWidth='300px'
            $height='50px'
            $display='flex'
            $justifyContent='center'
            $alignItems='center'
          >
            <DownloadWrap>
              <SText.Text>영화 포토카드를 저장해보세요!</SText.Text>
              <SBtn.CircleIconWrapperBtn onClick={handleDownload}>
                <DownloadIcon />
              </SBtn.CircleIconWrapperBtn>
            </DownloadWrap>
          </SBoxContainer.Box>

          <BtnWrap>
            <button style={{ all: 'unset', cursor: 'pointer', whiteSpace: 'nowrap' }}>
              <BtnText style={{ padding: '0 50px' }} onClick={() => handleSubmitReview()}>
                리뷰만 올리기
              </BtnText>
            </button>
            <SBtn.ReviewPostBtn onClick={() => handleSubmitReview(true)}>
              <BtnText>스토리 게시</BtnText>
            </SBtn.ReviewPostBtn>
          </BtnWrap>
        </BottomWrap>
      </Wrap>
    </Container>
  )
}

export default PostUploadReview

const Container = styled.div``
const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
`

const PhotoWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 362px;
  height: 429.75px;

  img {
    width: 100%;
    height: 100%;
  }
`

const BtnWrap = styled.div`
  display: flex;
`
const BottomWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;

  @media (max-width: 886px) {
    flex-direction: column;
    gap: 20px;
    align-items: end;
  }
`
const BtnText = styled(SText.Text)`
  text-shadow: 0px 0px 10px var(--primary-solid, #c77db5);
`

const DownloadWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`

const DownloadIcon = styled(DOWNLOAD)`
  width: 24px;
  height: 24px;
  color: white; // SVG 색상
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`
