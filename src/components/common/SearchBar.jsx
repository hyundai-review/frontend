import React, { useRef, useState } from 'react'
import searchBarIcon from '@/assets/searchBarIcon.svg'
import media from '@/styles/media'
import styled from 'styled-components'

function SearchBar({ handleSearch }) {
  const inputRef = useRef(null)
  const [inputFieldFocus, setInputFieldFocus] = useState(false)
  const handleSubmit = (e) => {
    e.preventDefault()
    handleSearch(inputRef.current.value)
  }
  return (
    <div>
      <SearchBarContainer $isfocused={inputFieldFocus} className='hoverBright'>
        <form onSubmit={handleSubmit} style={{ width: '100%', display: 'flex', height: '100%' }}>
          <SearchBarIconButton type='submit'>
            <img
              src={searchBarIcon}
              alt='searchBarIcon'
              style={{ width: '24px', height: '24px' }}
            />
          </SearchBarIconButton>
          <SearchBarInputFieldWrapper>
            <SearchBarInputField
              ref={inputRef}
              placeholder='영화 제목, 배우, 감독 검색'
              onFocus={() => setInputFieldFocus(true)}
              onBlur={() => setInputFieldFocus(false)}
            />
          </SearchBarInputFieldWrapper>
        </form>
      </SearchBarContainer>
    </div>
  )
}

const SearchBarContainer = styled.div`
  width: 574px;
  height: 52px;
  background-color: rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  display: flex;
  justify-content: start;
  align-items: center;
  ${media.medium`
    width:362px;
  `}
  ${(props) =>
    props.$isfocused &&
    `
    border: 1px solid rgba(255, 255, 255, 0.6);
    box-shadow: 0 0 15px 5px rgba(255, 255, 255, 0.3);
  `}
`
const SearchBarIconButton = styled.button`
  cursor: pointer;
  padding-left: 20px;
  height: 100%;
  align-items: center;
  display: flex;
  background-color: transparent;
  border: none;
`

const SearchBarInputFieldWrapper = styled.div`
  cursor: text;
  width: 100%;
  height: 100%;
`

//global style 설정하고 color, font 변경
const SearchBarInputField = styled.input`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding-left: 12px;
  padding-right: 20px;
  background-color: transparent;
  border: none;
  color: gray;
  outline: none;
`

export default SearchBar
