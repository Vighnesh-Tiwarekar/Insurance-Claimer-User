import React from 'react'
import { Navigate, useNavigate } from "react-router-dom";

export const SelectType = () => {

    const navigate = useNavigate()

    const handleType = (type) => {
        navigate(`/${type}`)
    }

    return (
        <>
            <button className='submit-btn' onClick={()=>handleType('health')}>Health Insurance</button>

            <button className='submit-btn' onClick={()=>handleType('travel')}>Travel Insurance</button>

            <button className='submit-btn' onClick={()=>handleType('vehicle')}>Vehicle Insurance</button>
        </>
    )
}
