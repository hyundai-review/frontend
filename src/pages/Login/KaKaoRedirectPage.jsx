import React, { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

function KaKaoRedirectPage() {
  const [searchParams] = useSearchParams()
  const authCode = searchParams.get('code')

  useEffect(() => {
    console.log('인가코드:', authCode)
  })
  return <div>KaKaoRedirectPage - 인가코드: ${authCode}</div>
}

export default KaKaoRedirectPage
