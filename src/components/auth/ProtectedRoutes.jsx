import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import { Navigate } from 'react-router-dom'

const ProtectedRoutes = () => {
    const {token} = useSelector((store) => store.userInfo)
    if(token){
    return (
       <Outlet />
    )
}
    else{
        return <Navigate to='/login' />
    }
}

export default ProtectedRoutes  