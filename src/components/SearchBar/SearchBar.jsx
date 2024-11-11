import React, { useRef, useState } from 'react'
import * as S from './SearchBar.style.js'
import searchBarIcon from '@/assets/searchBarIcon.svg'

function SearchBar({ handleSearch }) {
  const inputRef = useRef(null)
  const [inputFieldFocus, setInputFieldFocus] = useState(false)
  const handleSubmit = (e) => {
    e.preventDefault()
    handleSearch(inputRef.current.value)
  }
  return (
    <div>
      <S.StyledSearchBarContainer isfocused={inputFieldFocus}>
        <form onSubmit={handleSubmit} style={{ width: '100%', display: 'flex', height: '100%' }}>
          <S.StyledSearchBarIconButton type='submit'>
            <img
              src={searchBarIcon}
              alt='searchBarIcon'
              style={{ width: '24px', height: '24px' }}
            />
          </S.StyledSearchBarIconButton>
          <S.StyledSearchBarInputFieldWrapper>
            <S.StyledSearchBarInputField
              ref={inputRef}
              placeholder='영화 제목, 배우, 감독 검색'
              onFocus={() => setInputFieldFocus(true)}
              onBlur={() => setInputFieldFocus(false)}
            />
          </S.StyledSearchBarInputFieldWrapper>
        </form>
      </S.StyledSearchBarContainer>
    </div>
  )
}

export default SearchBar
