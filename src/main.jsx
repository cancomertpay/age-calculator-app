import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import AgeContextProvider from './store/AgeContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <AgeContextProvider>
    <App />
  </AgeContextProvider>,
)
