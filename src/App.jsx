import { RouterProvider } from 'react-router-dom'
import root from '@/routers/root'
import ModalContainer from './components/modal/ModalContainer'
function App() {
  return (
    <>
      <RouterProvider router={root} />
      <ModalContainer />
    </>
  )
}

export default App
