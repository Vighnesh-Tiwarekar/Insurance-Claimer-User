import express, { urlencoded } from "express"
import dotenv from "dotenv";
import cors from 'cors';
import cookieParser from "cookie-parser";
import { connectDB } from "./config/database.js";
import loginrouter from "./routes/loginroute.js";
import { validate_user } from "./middleware/validate_user.js";
import profilerouter from "./routes/profileroute.js";


dotenv.config();


const port = process.env.PORT || 5000;

const app = express()

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'PUT', 'PATCH', 'DELETE', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}))

app.use(cookieParser())

app.use(express.json())

app.use(urlencoded({extended: false}))

connectDB();

app.use('/apis/insur-claimer/login', loginrouter)

app.use('/apis/insur-claimer/profile', validate_user , profilerouter)

app.listen(port, () => {
    console.log(port)
})