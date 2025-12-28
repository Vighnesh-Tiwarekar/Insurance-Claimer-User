import React from 'react'
import { useNavigate } from 'react-router-dom'

export const Header = () => {

    const navigate = useNavigate()

    return (
        <>
            <div className='flex justify-between p-[10px]'>

                <div className='border-[1.5px] w-[50px] h-[50px] rounded-[50%]'></div>

                <div className='border-[1.5px] w-[50px] h-[50px] rounded-[50%] text-center bg-[violet]'
                    onClick={()=>{navigate('/profile')}}>
                    P</div>

            </div>
        </>
    )
}
