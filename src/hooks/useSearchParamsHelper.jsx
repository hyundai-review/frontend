import { useNavigate, useSearchParams } from 'react-router-dom'
//TODO(j) 훅 사용해서 쿼리 파람+리다이렉트 해결
export const useSearchParamsHelpoer = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
}
