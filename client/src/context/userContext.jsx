import axios from 'axios'
import { useState } from 'react'
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext } from 'react'
import {jwtDecode} from 'jwt-decode'
export const UserContext = createContext()
const backendUrl = import.meta.env.VITE_BACKEND_URL

const UserContextProvider = (props) => {

  const [uToken, setToken] = useState(localStorage.getItem('token')?localStorage.getItem('token'): '')
  //const decodedToken = jwtDecode(uToken|| '')
  const [user, setUser] = useState(null)

  const login = (user) =>{
    setUser(user)
  }
  const value = {
    uToken,
    user,
    login,
    setToken,
    backendUrl
  }
  return (
    <UserContext.Provider value={value}>
      {props.children}
    </UserContext.Provider>
  )
}

export default UserContextProvider
