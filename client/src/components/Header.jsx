import React from 'react'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { sign_out } from '../functions/login_functions'
import { AuthContext } from '../context/AuthContext'

export const Header = () => {

    const loginContext = useContext(AuthContext)

    const navigate = useNavigate()

    const signOut = () => {

        sign_out(loginContext)
        
    }

    return (
        <>
            <div className='flex justify-between p-[10px]'>

                <div className='border-[1.5px] w-[50px] h-[50px] rounded-[50%]'></div>

                <div className='border-[1.5px] w-[50px] h-[50px] rounded-[50%] text-center bg-[violet]'
                    onClick={()=>{navigate('/profile')}}>
                    P
                </div>

                <div onClick={signOut} className='cursor-pointer'>
                    Sign Out
                </div>

            </div>
        </>
    )
}
