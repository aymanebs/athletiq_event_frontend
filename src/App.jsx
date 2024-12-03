import { Provider } from 'react-redux';
import AppRouter from './router'
import { Toaster } from 'sonner';
import store from './store';

function App() {
  return (
    <>
      <Provider store={store}>
        <Toaster position="top-right"  richColors/>
        <AppRouter/>
      </Provider> 
    </>
  )
}

export default App
