import { validate_token } from "../utils/token_util.js"


export const validate_user = async(req, res, next) => {

    try{

        if(!validate_token(req.cookies.token))
        {
            return res.status(404).json({mssg: 'Token not found'})
        }

        next();

    }
    catch(err)
    {
        console.log(err)

        return res.status(501).json({ mssg: 'Some Error Occured' })
    }

}