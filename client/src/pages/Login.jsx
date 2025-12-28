import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { Navigate, useNavigate } from 'react-router-dom'

const LoginForm = ({ method, setmethod, setisOTP, loginContext, navigate }) => {

  const handleSubmit = (e) => {

    e.preventDefault()

    if (!method) {
      loginContext.setlogin(1)
      navigate('/')
    }
    else {
      setisOTP(true)
    }

  }

  return (
    <>
      <div className=' w-fit flex mx-auto border-2 border-black'>

        <div className={` p-[10px] cursor-pointer ${method ? 'bg-white' : 'bg-[gray]'} `}
          onClick={() => setmethod(0)}>
          Sign In</div>

        <div className='border-[1.5px]'></div>

        <div className={` p-[10px] cursor-pointer ${method ? 'bg-[gray]' : 'bg-white'} `}
          onClick={() => setmethod(1)}>
          Sign Up</div>
      </div>

      <div className='w-fit border-2 mx-auto'>

        <form onSubmit={handleSubmit} className='p-[10px] '>

          <div className='flex-col'>

            <div className='flex justify-between'>
              <div>Email</div>
              <input className='border-[1.5px]' type="email" required />
            </div>

            <div className='flex justify-between gap-[15px]'>
              <div>Password</div>
              <input className='border-[1.5px]' type="password" required />
            </div>

          </div>

          <button className='block w-fit border-2 mx-auto' type='submit'>
            Submit
          </button>

        </form>

      </div>
    </>
  )
}

const OTPForm = ({loginContext, navigate}) => {

  const handleSubmit = (e) => {

    e.preventDefault()

    loginContext.setlogin(1)
    navigate('/')

  }

  return (
    <>
      <form onSubmit={handleSubmit} className='border-[1.5px] w-fit mx-auto'>

        <div className='flex w-fit mx-auto'>

          <div>OTP</div>

          <input className='border-[1.5px]' type="text" />

        </div>

        <button className='block w-fit border-2 mx-auto' type='submit'>
          Submit
        </button>

      </form>
    </>
  )
}

export const Login = () => {

  const [method, setmethod] = useState(0)
  const [isOTP, setisOTP] = useState(false)

  const loginContext = useContext(AuthContext)
  const navigate = useNavigate();

  return (
    <>
      {isOTP ? <OTPForm loginContext = {loginContext} navigate = {navigate}></OTPForm> : 
      <LoginForm method={method} setmethod={setmethod} setisOTP={setisOTP} loginContext = {loginContext} navigate = {navigate}></LoginForm>}
    </>
  )
}
