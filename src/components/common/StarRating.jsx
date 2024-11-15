import { Rating } from '@mui/material'
import React, { useState } from 'react'
import styled from 'styled-components'
// import STAR from '@/assets/icons/star.svg?react'
import StarWhite from '@/assets/icons/star-white.svg?react'
import StarGray from '@/assets/icons/star-gray.svg?react'
import { useLocation } from 'react-router-dom'

/** 별점 생성&조회 함수 */
// type: 'controlled' | 'readonly'
// initialValue: 초기 별점 값
// onChange: 별점 변경 시 호출될 콜백 함수
// size: 아이콘 크기 (기본값 14)

const StyledStarWhite = styled(StarWhite)`
  width: ${({ size }) => size || 14}px;
  height: ${({ size }) => size || 14}px;
  filter: drop-shadow(0px 0px 10px var(--primary-light-red, #ffd7d7));
`
const StyledStarGray = styled(StarGray)`
  width: ${({ size }) => size || 14}px;
  height: ${({ size }) => size || 14}px;
`

function StarRating({ type = 'readonly', initialValue = 0, onChange, max = 5, size = 14 }) {
  return (
    <Rating
      name={`star-rating-${type}`}
      value={initialValue}
      onChange={(e, newValue) => {
        if (type === 'controlled' && onChange) {
          onChange(newValue)
        }
      }}
      readOnly={type === 'readonly'}
      max={max}
      icon={<StyledStarWhite size={size} />}
      emptyIcon={<StyledStarGray size={size} />}
      sx={{
        fontSize: size,
        // '& .MuiRating-iconFilled': {
        //   '& svg': {
        //     // fill: 'var(--gray-50, #FAFAFA)',
        //     filter: 'drop-shadow(0px 0px 10px var(--primary-light-red, #ffd7d7))',
        //   },
        // },
        // '& .MuiRating-iconEmpty': {
        //   '& svg': {
        //     fill: '#757575',
        //   },
        // },
      }}
    />
  )
}

export default StarRating
/*
별점 주기 사용예제
  const [initrating, setRating] = useState(3)

  const handleRatingChange = (newRating) => {
    setRating(newRating) // 별점 변경 시 상태 업데이트
  }
  ...
    <StarRating
      type='controlled' // 'controlled' 모드로 설정
      initialValue={initrating} // 초기 별점 값으로 상태 값 전달
      onChange={handleRatingChange} // 별점이 변경될 때 실행할 함수
      size={16} // 아이콘 크기를 24px로 설정
      max={5} // 최대 별점 5개 설정
    />
*/
