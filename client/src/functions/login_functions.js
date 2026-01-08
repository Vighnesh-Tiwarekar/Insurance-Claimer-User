import axios from 'axios'
// import { connect } from 'mongoose';

export const validate_login = async () => {

    try {

        const res = await axios.post(`${import.meta.env.VITE_BASE_API_URL}/login/validate-login`, {}, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (res.status == 200) {
            return true;
        }

        return false;

    }
    catch (err) {
        console.log('Error', err)
        return false;
    }
}

export const sign_up = async (setisOTP, setMssg) => {

    try {
        console.log("tmks")
        
        const email = document.getElementById('email').value
        const ps = document.getElementById('password').value

        const res = await axios.post(`${import.meta.env.VITE_BASE_API_URL}/login/sign-up`, {
            email: email,
            password: ps
        },
            {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });

        if (res.status == 200) {
            setisOTP(true)
        }
        else {
            setMssg(res.data.mssg)
        }

    }
    catch (err) {
        console.log(err)
        setMssg(err.response.data.mssg)
    }
}

export const resend_otp = async (setMsg) => {

    try {

        const res = await axios.post(`${import.meta.env.VITE_BASE_API_URL}/login/resend-otp`, {}, {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        });

        setMsg(res.data.mssg)

    }
    catch (err) {
        console.log(err)
        setMsg(err.response.data.mssg)
    }
}

export const validate_otp = async (loginContext, navigate, setMsg) => {

    try {
        const otp = document.getElementById('otp').value

        const res = await axios.post(`${import.meta.env.VITE_BASE_API_URL}/login/validate-otp`, {
            otp: otp
        },
            {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });

        if (res.status == 202) {
            loginContext.setlogin(true)
            navigate('/home')
        }
        else {
            setMsg(res.data.mssg)
        }

    }
    catch (err) {
        console.log(err)
        setMsg(err.response.data.mssg)
    }

}

export const sign_in = async (loginContext, navigate, setMssg) => {

    try {
        const email = document.getElementById('email').value
        const ps = document.getElementById('password').value

        const res = await axios.post(`${import.meta.env.VITE_BASE_API_URL}/login/sign-in`, {
            email: email,
            password: ps
        },
            {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });

        if (res.status == 202) {
            loginContext.setlogin(true)
            navigate('/home')
        }
        else {
            setMssg(res.data.mssg)
        }

    }
    catch (err) {
        console.log(err)
        setMssg(err.response.data.mssg)
    }
}

export const sign_out = async(loginContext) => {

    try{

        const res = await axios.delete(`${import.meta.env.VITE_BASE_API_URL}/login/sign-out`,{
            withCredentials: true,
            headers: {
                'Content-Type': 'applications/json'
            }
        })

        if(res.status == 201)
        {
            loginContext.setlogin(false)
        }

    }
    catch(err)
    {
        console.log(err)
    }
}