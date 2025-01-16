import { StrictMode } from 'react'
import App from './App'

import { createRoot } from 'react-dom/client'
import UserContextProvider from './context/userContext.jsx'
import AdminContextProvider from './context/AdminContext.jsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
      <UserContextProvider>
        <AdminContextProvider> 
          <App />
        </AdminContextProvider>
      </UserContextProvider>
    </BrowserRouter>
)
