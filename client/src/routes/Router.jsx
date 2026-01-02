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