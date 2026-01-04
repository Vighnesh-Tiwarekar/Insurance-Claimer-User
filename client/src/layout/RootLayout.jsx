import React from 'react'
import { Outlet } from 'react-router-dom'
import { Header } from '../components/Header'

export const RootLayout = () => {
    return (
        <>
            <Header></Header>
            <div className="pt-[70px]">
                <Outlet></Outlet>
            </div>
        </>
    )
}
