import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { Login } from '../pages/Login'
import { ProtectedRoutes } from './ProtectedRoutes'
import { Home } from '../pages/Home'
import { Profile } from '../pages/Profile'
import { RootLayout } from '../layout/RootLayout'
import { SelectType } from '../pages/SelectType'
import { HealthInsForm } from '../pages/HealthInsForm'
import { TravelInsForm } from '../pages/TravelInsForm'
import { VehicleInsForm } from '../pages/VehicleInsForm'
import Landing from '../pages/Landing'
import { AdminLogin } from '../admin/pages/AdminLogin'
import { Dashboard } from '../admin/pages/Dashboard'

export const Router = createBrowserRouter([
    {
        path: '/',
        element: <Landing></Landing>
    },
    {
        path: '/login',
        element: <Login></Login>
    },
    {
        path: '/admin/login',
        element: <AdminLogin></AdminLogin>
    },
    {
        path: '/admin/dashboard',
        element: <Dashboard></Dashboard>
    },

    {
        element: <RootLayout></RootLayout>,
        children: [
            {
                element: <ProtectedRoutes></ProtectedRoutes>,
                children: [
                    {
                        path: '/home',
                        element: <Home></Home>
                    },

                    {
                        path: '/profile',
                        element: <Profile></Profile>
                    },

                    {
                        path: '/select',
                        element: <SelectType></SelectType>
                    },

                    {
                        path: '/health',
                        element: <HealthInsForm></HealthInsForm>
                    },

                    {
                        path: '/travel',
                        element: <TravelInsForm></TravelInsForm>
                    },

                    {
                        path: 'vehicle',
                        element: <VehicleInsForm></VehicleInsForm>
                    }
                ]
            }
        ]
    }

])