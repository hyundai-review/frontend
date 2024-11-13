import { useNavigate, useSearchParams } from 'react-router-dom'

export const useSearchParamsHelpoer = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
}
