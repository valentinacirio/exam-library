import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render( //render serve per prendere ciò che c'è prima, quindi innietta root nella pagina
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
