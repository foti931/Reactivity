import ReactDOM from 'react-dom/client'
import './app/layout/styles.css'
import 'react-calendar/dist/Calendar.css'
import 'react-toastify/dist/ReactToastify.css';
import { StoreContext, store } from './app/stores/store.ts'
import { RouterProvider } from 'react-router-dom'
import { router } from './app/router/Routers.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StoreContext.Provider value={store}>
    <RouterProvider router={router} />
  </StoreContext.Provider>
)
