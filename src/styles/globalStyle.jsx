import { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset'

const globalStyle = createGlobalStyle`
	${reset}

    @font-face {
        font-family: 'ASinemaB';
        src: url('/assets/font/aSinemaB.ttf') format('truetype');
        font-weight: normal;
        font-style: normal;
        font-display: swap;
    }

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    :root {
        background-color: #0E111C;
        /* Colors */
        --color-gray-50 :#FAFAFA;
        --color-gray-100 : #F4F4F5;
        --color-gray-200 :  #E4E4E7;
        --color-gray-300:  #D4D4D8 ;
        --color-gray-400: #A1A1AA ;
        --color-gray-500: #71717A 
        --color-gray-600: #52525B ;
        --color-gray-700: #3F3F46 ;
        --color-gray-800: #27272A ;
        --color-gray-900: #18181B ;

        --color-primary-solid :  #C77DB5 ;
        --color-primary-gradient: linear-gradient(90deg, #ff7171, #8B89FF);
        --color-primary-light : linear-gradient(90deg, #FFD7D7, #B6B5FF);
    
        --color-sementic-success : #7ED6A0;
        --color-sementic-warning : #FFB199;
        --color-sementic-error: #FF9ECD;
        --color-sementic-info : #9DACFF;

        /* Fonts */
        * {
        font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
        }

        /* Hover Class Name */
        /* 사용법
        className='hoverBright'
        하면 hover시 해당 box와 border가 밝게 빛나는 효과를 줍니다.*/
        .hoverBright:hover{
            background: rgba(255, 255, 255, 0.2);
            border: 1px solid rgba(255, 255, 255, 0.6);
            backdrop-filter: blur(10px);
            box-shadow: 0 0 15px 5px rgba(255, 255, 255, 0.3);
        }
    }
    
`

export default globalStyle
