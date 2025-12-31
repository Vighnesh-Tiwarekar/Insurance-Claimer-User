import { resend_otp, sign_in, sign_up, validate_otp } from "../controllers/login_controller";
import express from 'express'


const loginrouter = express.Router();

loginrouter.post('/sign-in', sign_in);

loginrouter.post('/sign-up', sign_up);

loginrouter.post('/validate-otp', validate_otp);

loginrouter.post('/resend-otp', resend_otp);