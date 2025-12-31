import mongoose, { mongo } from "mongoose";


const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true
        },

        password: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true,
        collection: 'userTable'
    });


const temp_userSchema = new mongoose.Schema({

    email: {
        type: String,
        required:true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    otp: {
        type: Number,
        required: true
    }

},
{
    timestamps: true,
    collection: 'temp_user'
})

export const userTable = new mongoose.model('userTable', userSchema);

export const temp_user = new mongoose.model('temp_user', temp_userSchema);