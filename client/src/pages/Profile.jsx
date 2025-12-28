import React from 'react'

export const Profile = () => {
    return (
        <>
        <div className='w-fit mx-auto'>Profile</div>

        <form className='flex-row w-fit mx-auto'>

            <div className='flex justify-between'>
                <div>Name</div>
                <input className = 'border-[1.5px] border-black' type="text" required/>
            </div>

            <div className='flex justify-between'>
                <div>Email</div>
                <input className = 'border-[1.5px] border-black' type="email" required/>
            </div>

            <div className='flex justify-between'>
                <div>Phone No.</div>
                <input className = 'border-[1.5px] border-black' type="number" required/>
            </div>

            <div className='flex justify-between'>
                <div>Adhaar No.</div>
                <input className = 'border-[1.5px] border-black' type="number" required/>
            </div>

            <div className='flex justify-between gap-2'>
                <div>Vehicle License No.</div>
                <input className = 'border-[1.5px] border-black' type="text" />
            </div>

            <div className='flex justify-between '>
                <div>No. of Past Claims</div>
                <input className = 'border-[1.5px] border-black' type="number" required/>
            </div>

            <div className='flex justify-between'>
                <div>Address</div>
                <input className = 'border-[1.5px] border-black' type="text" required/>
            </div>

            <button className='w-fit mx-auto block border-[1.5px]' >Submit</button>

        </form>
        </>
    )
}
