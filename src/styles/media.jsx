import { css } from 'styled-components'

/** styled-component : media query 사용방법 */
//   ${media.small`
//     background-color: red;
//   `}

const breakpoints = {
  // small: '@media (max-width: 402px)',
  small: '@media (max-width: 428px)',
  medium: '@media (max-width: 768px)',
  large: '@media (min-width: 1441px)',
  laptop: '@media (min-width: 769px) and (max-width: 1440px)', // 작은 노트북 ~ 일반 노트북 (769px ~ 1440px)
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
