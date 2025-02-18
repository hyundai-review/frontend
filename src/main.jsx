import { StrictMode, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import GlobalStyle from './styles/globalStyle.jsx'
function Root() {
  return (
    <>
      <GlobalStyle />
      <App />
    </>
  )
}

createRoot(document.getElementById('root')).render(<Root />)
