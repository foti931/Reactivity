import ReactDOM from 'react-dom/client'
import App from './app/layout/App.tsx'
import './app/layout/styles.css'
import { StoreContext, store } from './app/stores/store.ts'
import React from 'react'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StoreContext.Provider value={store}>
    <App />
  </StoreContext.Provider>
)
