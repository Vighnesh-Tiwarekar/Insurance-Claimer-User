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
        const decoded = jwt.verify(token, process.env.SECRET_KEY)

        return true;
    }
    catch(err)
    {
        console.log(err)

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

