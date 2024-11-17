import { useNavigate, useSearchParams } from 'react-router-dom'
//TODO(j) 훅 사용해서 쿼리 파람+리다이렉트 해결
function useSearchParamsHelper(query, url) {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  // navigate(`${url}?q=${query}`)
  return `${url}?q=${query}`
}

export default useSearchParamsHelper
