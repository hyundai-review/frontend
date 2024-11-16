import StarRating from '@/components/common/StarRating'
import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

import * as SBoxContainer from '@/styles/boxContainer'
import * as SText from '@/styles/text'
import * as SBtn from '@/styles/button'
import { Checkbox } from '@mui/material'
import useReviewStore from '@/store/reviewStore'
import { useApi } from '@/libs/useApi'
import { useParams } from 'react-router-dom'

/** step 1. 텍스트 리뷰 작성 */
function PostTextReview() {
  const { nextStep, reviewPost, setReviewPost } = useReviewStore()
  const { post, error } = useApi()
  const { movieId } = useParams()

  const [starRating, setStarRating] = useState(reviewPost.rating)
  const formRef = useRef({
    rating: reviewPost.rating,
    content: reviewPost.textReview,
    isSpoil: reviewPost.isSpoil,
  })

  // 리뷰만 올리기
  const handleSubmitReview = async () => {
    if (!starRating || !formRef.current.content.trim()) {
      alert('별점과 리뷰를 모두 작성해주세요.')
      return
    }

    setReviewPost(formRef.current)

    const response = await post(`/reviews/${movieId}`, formRef.current)
    if (response.status === 200) {
      alert('리뷰가 등록되었습니다.')
    }
  }

  return (
    <Container>
      <div>
        <SText.Text style={{ marginBottom: '6px' }}>별점을 선택해주세요</SText.Text>
        <Wrap $width='362px' $height='48px'>
          <StarWrap>
            <StarRating
              type='controlled'
              size={25}
              initialValue={starRating}
              onChange={(rating) => {
                setStarRating(rating)
                setReviewPost({ rating: rating })
              }}
            />
          </StarWrap>
        </Wrap>
      </div>

      <div>
        <SText.Text style={{ marginBottom: '6px' }}>리뷰를 작성해주세요</SText.Text>
        <SBoxContainer.Box $width='100%' $height='316px' $minWidth='362px'>
          <SText.TextArea
            placeholder='해당 영화에 대한 리뷰를 남겨주세요'
            $variant='md'
            $color='var(--gray-200)'
            defaultValue={reviewPost.content}
            onChange={(e) => {
              formRef.current.content = e.target.value
            }}
          />
        </SBoxContainer.Box>
      </div>
      <BottomWrap>
        <SBoxContainer.Box $width='324px' $minWidth='362px'>
          <SpoWrap>
            <SText.Text>스포일러가 포함되어있나요?</SText.Text>
            <Checkbox
              defaultChecked={reviewPost.isSpoil}
              onChange={(e) => {
                formRef.current.isSpoil = e.target.checked
              }}
              disableRipple // 애니 효과 제거
              sx={{
                padding: '0',
                color: 'var(--color-gray-50)',
                filter: 'drop-shadow(0px 0px 10px var(--primary-light-red, #ffd7d7))',

                '&.Mui-checked': {
                  color: 'var(--color-gray-50)',
                },
                '& .MuiSvgIcon-root': {},
              }}
            />
          </SpoWrap>
        </SBoxContainer.Box>

        <BtnWrap>
          <button
            style={{ all: 'unset', cursor: 'pointer', whiteSpace: 'nowrap' }}
            onClick={handleSubmitReview}
          >
            <BtnText style={{ padding: '0 50px' }}>리뷰만 올리기</BtnText>
          </button>

          <SBtn.ReviewPostBtn onClick={nextStep}>
            <BtnText>포토카드 만들기</BtnText>
          </SBtn.ReviewPostBtn>
        </BtnWrap>
      </BottomWrap>
    </Container>
  )
}

export default PostTextReview

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`
const Wrap = styled(SBoxContainer.Box)`
  display: flex;
  justify-content: center;
`
const StarWrap = styled.div`
  display: flex;
  align-items: center;
`

const SpoWrap = styled.div`
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const BtnText = styled(SText.Text)`
  text-shadow: 0px 0px 10px var(--primary-solid, #c77db5);
`

const BottomWrap = styled.div`
  display: flex;
  justify-content: space-between;

  @media (max-width: 933px) {
    flex-direction: column;
    gap: 20px;
  }
`
const BtnWrap = styled.div`
  display: flex;
`
