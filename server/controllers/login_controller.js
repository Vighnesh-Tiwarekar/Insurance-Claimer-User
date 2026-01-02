import { temp_user, users } from "../models/userModel.js";
import { generate_otp, send_otp } from "../utils/otp_utils.js";
import { encrypt_pass, validate_pass } from "../utils/password_util.js";
import { decoded_token, generate_token, validate_token } from "../utils/token_util.js";

export const sign_in = async (req, res) => {

    try {

        const data = req.body;

        const user = await users.findOne({ email: data.email }).lean()

        if (!user) {
            return res.status(404).json({ mssg: 'Email not found' })
        }

        if (await validate_pass(user.password, data.password)) {

            const token = generate_token(data, '12h')

            return res.status(202).cookie('token', token, {
                httpOnly: true,
                sameSite: 'Lax', // Allows localhost usage
                secure: false,   // Set to TRUE only if you are using HTTPS
                path: '/',
                maxAge: 1000 * 60 * 60 * 12
            }).json({ mssg: 'Login Successful' })

        }

        return res.status(401).json({ mssg: 'Incorrect Password' })

    }
    catch (err) {
        console.log('Error', err)

        return res.status(501).json({ mssg: 'Some Error Occured' })
    }

}


export const sign_up = async (req, res) => {
    
    try {

        const data = req.body

        const poss_user = await users.findOne({ email: data.email }).lean()

        if (poss_user) {
            console.log('ddd')
            return res.status(401).json({ mssg: 'Email already exists' })
        }

        const hashedpass = await encrypt_pass(data.password);

        const otp = generate_otp();

        await send_otp(otp);

        await temp_user.findOneAndUpdate({ email: data.email },
            {
                email: data.email,
                password: hashedpass,
                otp: otp
            },
            {
                upsert: true, setDefaultsOnInsert: true
            })

        const token = generate_token(data, '5m')

        return res.status(200).cookie('temp_token', token, {
            httpOnly: true,
            sameSite: 'Lax', // Allows localhost usage
            secure: false,   // Set to TRUE only if you are using HTTPS
            path: '/',
            maxAge: 1000 * 60 * 30
        }).json({ mssg: 'Enter OTP' })

    }
    catch (err) {
        console.log('Error', err)
        return res.status(501).json({ mssg: 'Some Error Occured' })
    }

}


export const validate_otp = async (req, res) => {

    try {

        const data = req.body

        if (!req.cookies.temp_token) {
            console.log('No temp_token cookie found');
            return res.status(401).json({ mssg: 'Session expired. Please sign up again.' })
        }

        if (!validate_token(req.cookies.temp_token)) {
            console.log('Token validation failed');
            return res.status(401).json({ mssg: 'OTP expired' })
        }

        const decoded = decoded_token(req.cookies.temp_token)

        const temp = await temp_user.findOne({ email: decoded.email, otp: data.otp });

        if (!temp) {
            return res.status(404).json({ mssg: 'Email or OTP does not match' })
        }

        await users.create({
            email: temp.email,
            password: temp.password
        })

        await temp_user.deleteOne({ email: temp.email })

        const token = generate_token(decoded, '12h')

        return res.status(202).cookie('token', token, {
            httpOnly: true,
            sameSite: 'Lax', // Allows localhost usage
            secure: false,   // Set to TRUE only if you are using HTTPS
            path: '/',
            maxAge: 1000 * 60 * 60 * 12
        }).json({ mssg: 'Login Successful' })

    }
    catch (err) {
        console.log('Error', err)
        return res.status(501).json({ mssg: 'Some Error Occured' })
    }
}


export const resend_otp = async (req, res) => {

    try {

        const data = req.body

        const decoded = decoded_token(req.cookies.temp_token)

        const temp = await temp_user.findOne({ email: decoded.email });

        if (!temp) {
            return res.status(404).json({ mssg: 'Email does not exist' })
        }

        const otp = generate_otp();

        await send_otp(otp);

        await temp_user.updateOne({
            email: decoded.email
        },
            {
                $set: {
                    otp: otp
                }
            })

        const token = generate_token(decoded, '5m')

        return res.status(200).cookie('temp_token', token, {
            httpOnly: true,
            sameSite: 'Lax', // Allows localhost usage
            secure: false,   // Set to TRUE only if you are using HTTPS
            path: '/',
            maxAge: 1000 * 60 * 30
        }).json({ mssg: 'New OTP sent' })

    }
    catch (err) {
        console.log('Error', err)

        return res.status(501).json({ mssg: 'Some Error Occured' })
    }

}


export const validate_login = async (req, res) => {

    try {

        if (!validate_token(req.cookies.token)) {
            return res.status(401).json({ mssg: 'Invalid Login' })
        }

        return res.status(200).json({ mssg: 'Valid Login' })

    }
    catch (err) {
        console.log('Error', err)

        return res.status(501).json({ mssg: 'Invalid Login' })
    }
}

export const sign_out = async (req, res) => {

    try {

        res.status(201).clearCookie('token', {
            httpOnly: true,
            sameSite: 'Lax',
            secure: false,
            path: '/'
        }).json({ mssg: 'Sign Out successful' })

    }
    catch (err) {
        console.log(err)
        return res.status(501).json({ mssg: 'Some Error Occured' })
    }
}