import jwt from 'jsonwebtoken'

export const generate_token = (data, age) => {

    try{

        const payload = {
            email: data.email
        }

        const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: age})


        return token;

    }
    catch(err)
    {
        console.log('Error', err)
    }
}

export const validate_token = (token) => {

    try
    {
        console.log('Validating token with SECRET_KEY:', process.env.SECRET_KEY ? 'exists' : 'MISSING');
        // console.log('Token received:', token);
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        console.log('Token validated successfully');
        return true;
    }
    catch(err)
    {
        console.log('Token validation error:', err.message)

        return false;
    }
}

export const decoded_token = (token) => {

    try{

        const decoded = jwt.decode(token)

        return decoded;
    }
    catch(err)
    {
        console.log('Error', err)
    }
}

