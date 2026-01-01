import { resend_otp, sign_in, sign_out, sign_up, validate_login, validate_otp } from "../controllers/login_controller.js";
import express from 'express'


const loginrouter = express.Router();

loginrouter.post('/sign-in', sign_in);

loginrouter.post('/sign-up', sign_up);

loginrouter.post('/validate-otp', validate_otp);

loginrouter.post('/resend-otp', resend_otp);

loginrouter.post('/validate-login', validate_login)

loginrouter.delete('/sign-out', sign_out);

export default loginrouter;