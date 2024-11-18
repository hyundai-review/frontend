import React, { useRef, useState } from 'react'
import searchBarIcon from '@/assets/icons/searchBarIcon.svg'
import media from '@/styles/media'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import useSearchParamsHelper from '@/hooks/useSearchParamsHelper'
//TODO(j) 훅으로 searchparams 연결하기

function SearchBar({ defaultValue }) {
  const navigate = useNavigate()
  const inputRef = useRef(null)
  const [inputFieldFocus, setInputFieldFocus] = useState(false)
  // const next = useSearchParamsHelper()
  const handleSubmit = (e) => {
    e.preventDefault()
    const removeBlankValue = encodeURIComponent(inputRef.current.value.trim())
    if (removeBlankValue !== '') {
      navigate(`/search?q=${removeBlankValue}`)
      // console.log(next(removeBlankValue, '/search'))
    }
  }
  return (
    <div>
      <SearchBarContainer $isfocused={inputFieldFocus} className='hoverBright'>
        <SearchBarForm onSubmit={handleSubmit}>
          <SearchBarIconButton type='submit'>
            <SearchBarIconButtonImage src={searchBarIcon} alt='searchBarIcon' />
          </SearchBarIconButton>
          <SearchBarInputFieldWrapper>
            <SearchBarInputField
              ref={inputRef}
              placeholder='영화 제목, 배우, 감독 검색'
              onFocus={() => setInputFieldFocus(true)}
              onBlur={() => setInputFieldFocus(false)}
              defaultValue={defaultValue}
            />
          </SearchBarInputFieldWrapper>
        </SearchBarForm>
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
const SearchBarForm = styled.form`
  width: 100%;
  display: flex;
  height: 100%;
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

const SearchBarIconButtonImage = styled.img`
  width: 24px;
  height: 24px;
`

const SearchBarInputFieldWrapper = styled.div`
  cursor: text;
  width: 100%;
  height: 100%;
`

const SearchBarInputField = styled.input`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding-left: 12px;
  padding-right: 20px;
  background-color: transparent;
  border: none;
  font-size: 16px;
  line-height: 24px;
  color: var(--color-gray-50);
  font-weight: 100;
  outline: none;
`

export default SearchBar
