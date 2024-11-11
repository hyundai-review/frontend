import media from '@/styles/media'
import styled from 'styled-components'

export const StyledSearchBarContainer = styled.div`
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
    props.isfocused &&
    `
    border: 1px solid rgba(255, 255, 255, 0.6);
    box-shadow: 0 0 15px 5px rgba(255, 255, 255, 0.3);
  `}
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.6);
    backdrop-filter: blur(10px);
    box-shadow: 0 0 15px 5px rgba(255, 255, 255, 0.3);
  }
`
export const StyledSearchBarIconButton = styled.button`
  cursor: pointer;
  padding-left: 20px;
  height: 100%;
  align-items: center;
  display: flex;
  background-color: transparent;
  border: none;
`

export const StyledSearchBarInputFieldWrapper = styled.div`
  cursor: text;
  width: 100%;
  height: 100%;
`

//global style 설정하고 color, font 변경
export const StyledSearchBarInputField = styled.input`
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
