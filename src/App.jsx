import { RouterProvider } from 'react-router-dom'
import root from '@/routers/root'
import Modal from './components/common/Modal'
function App() {
  return (
    <>
      <RouterProvider router={root} />
      <Modal />
    </>
  )
}

export default App
