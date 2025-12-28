import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { Login } from '../pages/Login'
import { ProtectedRoutes } from './ProtectedRoutes'
import { Home } from '../pages/Home'
import { Profile } from '../pages/Profile'
import { RootLayout } from '../layout/RootLayout'

export const Router = createBrowserRouter([
    {
        path: '/login',
        element: <Login></Login>
    },

    {
        element: <RootLayout></RootLayout>,
        children: [
            {
                element: <ProtectedRoutes></ProtectedRoutes>,
                children: [
                    {
                        path: '/',
                        element: <Home></Home>
                    },

                    {
                        path: '/profile',
                        element: <Profile></Profile>
                    }
                ]
            }
        ]
    }

])