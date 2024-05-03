import React from 'react'
import ReactDOM from 'react-dom/client'
import { Toaster } from './components/ui/toaster.jsx'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'

import {  HelmetProvider } from 'react-helmet-async';
import { store } from './store.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
    <BrowserRouter>
    <Provider store={store}>
      <App />
      <Toaster />
      </Provider>
    </BrowserRouter>
    </HelmetProvider>
   
  </React.StrictMode>,
)
