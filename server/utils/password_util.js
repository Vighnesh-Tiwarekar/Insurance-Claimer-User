import bcrypt from 'bcryptjs'

export const encrypt_pass = async (password) => {

    try {

        const hashed_pass = await bcrypt.hash(password, 10)

        return hashed_pass;

    }
    catch (err) {

        console.log("Error", err)

    }
}

export const validate_pass = async (hashed_pass, password) => {

    try{
        
        return await bcrypt.compare( password , hashed_pass);
    }
    catch(err)
    {
        console.log('Error',err)
    }
}