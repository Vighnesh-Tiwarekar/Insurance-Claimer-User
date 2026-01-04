import React from 'react'
import { Navigate, useNavigate } from "react-router-dom";
import '../css/components_css/Module.css';

export const SelectType = () => {

    const navigate = useNavigate()

    const handleType = (type) => {
        navigate(`/${type}`)
    }

    return (
        <div className='flex justify-around items-center h-[80vh] flex-row'>
            <button className='module' onClick={()=>handleType('health')}>Health Insurance</button>

            <button className='module' onClick={()=>handleType('travel')}>Travel Insurance</button>

            <button className='module' onClick={()=>handleType('vehicle')}>Vehicle Insurance</button>
        </div>
    )
}
