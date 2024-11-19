import useReviewStore from '@/store/reviewStore'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import * as SText from '@/styles/text'
import * as SBtn from '@/styles/button'
import * as SBoxContainer from '@/styles/boxContainer'
import DOWNLOAD from '@/assets/icons/download.svg?react'
import KAKAO from '@/assets/icons/kakaoYellow.svg'
import { useApi } from '@/libs/useApi'
import { useNavigate, useParams } from 'react-router-dom'
import { transformReviewPost } from '@/utils/dataTransform'
import { objectToFormData } from '@/utils/objectToFormdata'
import useModalStore from '@/store/modalStore'
function PostUploadReview() {
  const { processPhotocard, reviewPost } = useReviewStore()
  const { post, error } = useApi()
  const { movieId } = useParams()
  const { openModal } = useModalStore()
  const navigate = useNavigate()
  const [reviewContent, setReviewContent] = useState('')

  useEffect(() => {
    // 카카오 SDK 초기화
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init('18b0ff3c3023edbbd19587b0c2440163')
    }
  }, [])

  const handleShare = (title, content, image, id) => {
    console.log(image)
    if (window.Kakao) {
      window.Kakao.Link.sendDefault({
        objectType: 'feed',
        content: {
          title: `${title}`, // 공유할 글귀
          description: content, // 설명 텍스트
          imageUrl: `${image}`, // 이미지 URL
          link: {
            mobileWebUrl: `https://mylittlefra.me/movie/${movieId}/detail`, // 링크 (모바일 웹)
            webUrl: `https://mylittlefra.me/movie/${movieId}/detail`, // 링크 (웹)
          },
        },
      })
    }
  }

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
      openModal('confirm', { message: '리뷰를 등록하시겠습니까?' }, async () => {
        try {
          const response = await post(`/reviews/${movieId}`, reviewPost)

          if (response.status === 200) {
            navigate(`/movie/${movieId}/detail`)
          }
        } catch (err) {
          if (err.response?.status === 409) {
            openModal('alert', {
              message: '이미 리뷰를 작성하셨습니다.',
            })
          }
        }
      })
    } else {
      // 스토리 게시

      const transformData = transformReviewPost(reviewPost, processPhotocard.step2)
      console.log('transformData:', transformData)
      setReviewContent(transformData.content)
      // 고유한 파일명 생성
      const timestamp = new Date().getTime()
      const filename = `photocard_${timestamp}.jpg`

      const formData = objectToFormData(transformData, {
        fileKeys: {
          photocard: filename,
        },
      })

      const object = {}
      formData.forEach((value, key) => (object[key] = value))
      console.log('FormData as object:', object)

      openModal('confirm', { message: '리뷰를 등록하시겠습니까?' }, async () => {
        try {
          const response = await post(`/reviews/photo/${movieId}`, formData, true)

          https: if (response.status === 200) {
            openModal('confirm', { message: '카카오톡에 공유하시겠습니까?' }, () => {
              console.log(response.data)
              handleShare(
                'mylittleframe에 참여해 보세요',
                response.data.content,
                response.data.photocard,
                response.data.reviewId,
              )
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
      })
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
            style={{ flexDirection: 'column', gap: '10px' }}
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
