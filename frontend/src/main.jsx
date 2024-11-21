import { StrictMode } from 'react'
import { React } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
// import {AuthProvider} from "./context/AuthProvider.jsx"
import { AuthProvider } from './contextApi/ContextApi.jsx'
import { BrowserRouter } from 'react-router-dom'
import { SocketProvider } from './contextApi/SocketContext.jsx'
// import { Toaster } from 'react-hot-toast';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <AuthProvider>
    <SocketProvider>
      {/* <Toaster /> */}
    <App />
    </SocketProvider>
    </AuthProvider>
    </BrowserRouter>
)
