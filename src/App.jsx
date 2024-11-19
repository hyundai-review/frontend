import { RouterProvider } from 'react-router-dom'
import root from '@/routers/root'
import ModalContainer from './components/modal/ModalContainer'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
const queryClient = new QueryClient()
function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={root} />
        <ModalContainer />
      </QueryClientProvider>
    </>
  )
}

export default App
