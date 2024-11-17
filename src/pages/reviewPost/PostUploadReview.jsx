import useReviewStore from '@/store/reviewStore'
import React from 'react'
import styled from 'styled-components'
import * as SText from '@/styles/text'
import * as SBtn from '@/styles/button'
import * as SBoxContainer from '@/styles/boxContainer'
import DOWNLOAD from '@/assets/icons/download.svg?react'

function PostUploadReview() {
  const { processPhotocard } = useReviewStore()

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
              <BtnText style={{ padding: '0 50px' }}>리뷰만 올리기</BtnText>
            </button>
            <SBtn.ReviewPostBtn>
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
