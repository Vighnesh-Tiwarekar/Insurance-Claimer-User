import { profile } from "../models/profileModel.js";
import { users } from "../models/userModel.js";
import { decoded_token } from "../utils/token_util.js"


export const get_profile = async (req, res) => {

    try {

        const decoded = decoded_token(req.cookies.token);

        const user = await users.findOne({ email: decoded.email }).lean()

        const prof = await profile.findOne({ profileID: user._id }).lean()

        if (!prof) {
            return res.status(202).json({ status: false, prof: prof })
        }

        return res.status(202).json({ status: true, prof: prof })

    }
    catch (err) {
        console.log(err)
        return res.status(501).json({ mssg: 'Some Error Occured' })
    }
}

export const post_profile = async (req, res) => {

    try {

        console.log('post')

        const data = req.body.data

        const decoded = decoded_token(req.cookies.token);

        const user = await users.findOne({ email: decoded.email }).lean()

        await profile.create({
            profileID: user._id,
            name: data.name,
            phone: data.phone,
            email: data.email,
            adhaar: data.adhaar,
            license: data.license,
            past_claims: data.past_claims,
            address: data.address
        })

        return res.status(202).json({ mssg: 'Profile created successfully' })

    }
    catch (err) {
        console.log(err)
        return res.status(501).json({ mssg: 'Some Error Occured' })
    }
}

export const patch_profile = async (req, res) => {

    try {

        console.log('patch')

        const data = req.body.data

        const decoded = decoded_token(req.cookies.token);

        const user = await users.findOne({ email: decoded.email }).lean()

        await profile.findOneAndUpdate({
            profileID: user._id
        },
            {
                $set: {
                    name: data.name,
                    phone: data.phone,
                    email: data.email,
                    adhaar: data.adhaar,
                    license: data.license,
                    past_claims: data.past_claims,
                    address: data.address
                }
            },
            {
                new: true
            })

        return res.status(202).json({ mssg: 'Profile created successfully' })

    }
    catch (err) {
        console.log(err)
        return res.status(501).json({ mssg: 'Some Error Occured' })
    }
}