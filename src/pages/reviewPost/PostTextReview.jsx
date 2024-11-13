import StarRating from '@/components/common/StarRating'
import React, { useState } from 'react'
import styled from 'styled-components'

import * as SBoxContainer from '@/styles/boxContainer'
import * as SText from '@/styles/text'
import * as SBtn from '@/styles/button'
import { Checkbox } from '@mui/material'
import useReviewStore from '@/store/reviewStore'

/** step 1. 텍스트 리뷰 작성 */
function PostTextReview() {
  const [starRating, setStarRating] = useState(0)
  const handleStarRating = (rating) => {
    setStarRating(rating)
  }
  const [isChecked, setIsChecked] = useState(false)
  const { nextStep } = useReviewStore()

  const handleChange = (event) => {
    setIsChecked(event.target.checked)
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
              onChange={handleStarRating}
            />
          </StarWrap>
        </Wrap>
      </div>

      <div>
        <SText.Text style={{ marginBottom: '6px' }}>리뷰를 작성해주세요</SText.Text>
        <SBoxContainer.Box $width='100%' $height='316px' $minWidth='362px'>
          input 넣어야 해
        </SBoxContainer.Box>
      </div>
      <BottomWrap>
        <SBoxContainer.Box $width='324px'>
          <SpoWrap>
            <SText.Text>스포일러가 포함되어있나요?</SText.Text>
            <Checkbox
              checked={isChecked}
              onChange={handleChange}
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
          <button style={{ all: 'unset', cursor: 'pointer' }}>
            <BtnText>리뷰만 올리기</BtnText>
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
  /* background-color: red; */
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
`
const BtnWrap = styled.div`
  display: flex;
  gap: 54px;
`
