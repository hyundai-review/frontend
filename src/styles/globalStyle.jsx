import { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset'

const globalStyle = createGlobalStyle`
	${reset}

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    :root {
        /* Colors */
    }
`

export default globalStyle
