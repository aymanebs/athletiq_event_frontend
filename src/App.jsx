import AppRouter from './router'
import { Toaster } from 'sonner';


function App() {
  

  return (
    <>
        <Toaster position="top-right"  richColors/>
        <AppRouter/>
        
    </>
  )
}

export default App
