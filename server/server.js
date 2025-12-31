import express, { urlencoded } from "express"
import dotenv from "dotenv";
import cors from 'cors';
import cookieParser from "cookie-parser";
import { connectDB } from "./config/database.js";
import loginrouter from "../../ChatNest - Final Version/server/routes/loginroute.js";

dotenv.config();


const port = process.env.PORT;

const app = express()

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'PUT', 'PATCH', 'DELETE', 'POST'],
    allowedHeaders: ['Content-type', 'Authorization'],
    credentials: true
}))

app.use(cookieParser())

app.use(express.json())

app.use(urlencoded({extended: false}))

connectDB();

app.use('/apis/insur-claimer/login', loginrouter)

app.listen(port, () => {
    console.log(port)
})