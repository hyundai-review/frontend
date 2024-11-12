import { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset'

const globalStyle = createGlobalStyle`
	${reset}

    :root {
        background-color: #0E111C;
        /* Colors */
    }
`

export default globalStyle
