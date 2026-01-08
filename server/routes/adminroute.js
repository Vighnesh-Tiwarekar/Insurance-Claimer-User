import express from 'express';
import { admin_login, get_all_claims, update_claim_status } from '../controllers/admin_controller.js';

const adminrouter = express.Router();

adminrouter.post('/login', admin_login);
adminrouter.get('/claims', get_all_claims);
adminrouter.put('/claims/update', update_claim_status);

export default adminrouter;
