import mongoose from 'mongoose'

const profileSchema = new mongoose.Schema({

    profileID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true,
        unique: true
    },

    name: {
        type: String,
        required: true
    },

    phone: {
        type: String,
        required: true,
        unique: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    adhaar: {
        type: String,
        required: true,
        unique: true
    },

    license: {
        type: String,
        unique: true
    },

    past_claims: {
        type: String,
        required: true,
    },

    address: {
        type: String,
        required: true
    }

},
    {
        timestamps: true,
        collection: 'profile'
    })



export const profile = new mongoose.model('profile', profileSchema)