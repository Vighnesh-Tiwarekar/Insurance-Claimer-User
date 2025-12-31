import { temp_user, userTable } from "../models/userModel";
import { generate_otp, send_otp } from "../utils/otp_utils";
import { encrypt_pass, validate_pass } from "../utils/password_util";
import { decoded_token, generate_token, validate_token } from "../utils/token_util";

export const sign_in = async (req, res) => {

    try {

        const data = req.body;

        const user = userTable.findOne({email: data.email})

        if(!user)
        {
            return res.status(404).json({mssg: 'Email not found'})
        }

        if(await validate_pass(user.password, data.password))
        {

            const token = generate_token(data, '12h')

            return res.status(202).cookie('token',token,{
                httpOnly: true,
                secure: true,
                sameSite: 'None',
                maxAge: 1000 * 60 * 60 * 12

            }).json({mssg: 'Login Successful'})

        }

        return res.status(401).json({msssg: 'Incorrect Password'})

    }
    catch (err) {
        console.log('Error', err)
    }

}


export const sign_up = async (req, res) => {

    try {

        const data = req.body

        const poss_user = user.findOne({email: data.email})

        if(poss_user)
        {
            return res.status(401).json({mssg: 'Email already exists'})
        }

        const hashedpass = await encrypt_pass(data.password);

        const otp = generate_otp();

        await send_otp(otp);
        
        await temp_user.create({
            email: data.email,
            password: hashedpass,
            otp: otp
        })
        
        const token = generate_token(data, '5m')

        return res.status(200).cookie('temp_token', token,{
            httpOnly: true,
            secure: true,
            sameSite: 'None',
            maxAge: 1000 * 60 * 30
        }).json('Enter OTP')

    }
    catch (err) {
        console.log('Error', err)
    }

}


export const validate_otp = async(req, res) => {

    try{

        const data = req.body

        if(!validate_token(req.cookies.token))
        {
            return res.status(401).json({mssg: 'OTP expired'})
        }

        const decoded = decoded_token(req.cookies.token)

        const temp = await temp_user.findOne({email: decoded.email, otp: data.otp});

        if(!temp)
        {
            return res.status(404).json({mssg: 'Email or OTP does not match'})
        }

        await userTable.create({
            email: temp.email,
            password: temp.password
        })

        const token = generate_token(data, '12h')

        return res.status(202).cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'None',
            maxAge: 1000 * 60 * 60 * 12
        }).json({mssg: 'Login Successful'})

    }
    catch(err)
    {
        console.log('Error',err)
    }
}

export const resend_otp = async (req, res) => {

    try {

        const data = req.body

        const decoded = decoded_token(req.cookies.token)

        const temp = await temp_user.findOne({email: decoded.email});

        if(!temp)
        {
            return res.status(404).json({mssg: 'Email does not exist'})
        }

        const otp = generate_otp();

        await send_otp(otp);
        
        await temp_user.updateOne({
            email: data.email
        },
        {
            $set: {
                otp: otp
            }
        })
        
        const token = generate_token(data, '5m')

        return res.status(200).cookie('temp_token', token,{
            httpOnly: true,
            secure: true,
            sameSite: 'None',
            maxAge: 1000 * 60 * 30
        }).json('Enter OTP')

    }
    catch (err) {
        console.log('Error', err)
    }

}


