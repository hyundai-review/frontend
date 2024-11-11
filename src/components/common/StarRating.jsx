import { Rating } from '@mui/material'
import React, { useState } from 'react'
import styled from 'styled-components'
import STAR from '@/assets/icons/star.svg?react'
import { useLocation } from 'react-router-dom'

/** 별점 생성&조회 함수 */
// type: 'controlled' | 'readonly'
// initialValue: 초기 별점 값
// onChange: 별점 변경 시 호출될 콜백 함수

function StarRating({ type = 'readonly', initialValue = 0, onChange, max = 5 }) {
  const location = useLocation()

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
      //   icon={<STAR />}
      //   emptyIcon={<STAR />
      sx={{
        '& .MuiRating-iconFilled': {
          '& svg': {
            fill: 'var(--gray-50, #FAFAFA)',
            filter:
              'drop-shadow(0px 0px 10px var(--primary-solid-light, rgba(199, 125, 181, 0.50)))',
          },
        },
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
