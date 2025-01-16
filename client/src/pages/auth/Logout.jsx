import React from 'react'
import { useAuthStore } from '../../store/AuthStore'
import { useNavigate } from 'react-router-dom'

const Logout = () => {
  const navigate = useNavigate();
  const {logout} = useAuthStore
  const handleLogout = async()=>{
   logout()
   navigate('/')
  }
  return (
    handleLogout()
  )
}

export default Logout
