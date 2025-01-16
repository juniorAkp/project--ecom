import { useState } from 'react'
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import  { createContext } from 'react'

export const AdminContext = createContext()
const backendUrl = import.meta.env.VITE_BACKEND_URL
const AdminContextProvider = (props) => {
  const [aToken,setToken] = useState(null)
  const value = {
    aToken,
    setToken,
    backendUrl
  }
  return(
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  )
}

export default AdminContextProvider
