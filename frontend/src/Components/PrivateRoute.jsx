import React from 'react'
import {Navigate,Outlet} from 'react-router-dom'
import { useAuth } from '../Context/AuthContext'
function PrivateRoute() {
    const {isAuthenticated,loading}=useAuth()
  if(loading){
        return <h1>Loading...</h1>
  }
  return (
    <>
   { isAuthenticated ? <Outlet/>: <Navigate to="/login"/>}
    </>
  )
}

export default PrivateRoute
