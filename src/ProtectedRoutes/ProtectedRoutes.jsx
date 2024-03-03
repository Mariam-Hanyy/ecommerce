import { jwtDecode } from 'jwt-decode'
import React from 'react'
import { Navigate } from 'react-router-dom'

export default function ProtectedRoutes({children}) {
    let token = localStorage.getItem('token')
    try{
        const decoded =jwtDecode(token);
        // console.log(decoded);
        if(decoded.role !== "user"){
            localStorage.clear()
            return <Navigate to='/login'/>
        }
    }catch(error){
        localStorage.clear();
    return <Navigate to='/login'/>
    }
    if(token) return children
    return <Navigate to='/login'/>
}
