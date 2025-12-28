import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { Navigate, Outlet } from 'react-router-dom';

export const ProtectedRoutes = () => {

    const loginContext = useContext(AuthContext);

    return (loginContext.login ? <Outlet></Outlet> : <Navigate to='/login' replace></Navigate>)

}
