import { css } from 'styled-components'

/** styled-component : media query 사용방법 */
//   ${media.small`
//     background-color: red;
//   `}

const breakpoints = {
  small: '@media (max-width: 480px)',
  medium: '@media (max-width: 1024px)',
  large: '@media (min-width: 1025px)',
}

const media = Object.entries(breakpoints).reduce((acc, [key, value]) => {
  return {
    ...acc,
    [key]: (first, ...interpolations) => css`
      ${value} {
        ${css(first, ...interpolations)}
      }
    `,
  }
}, {})

export default media
