import express from 'express'
import { get_profile, patch_profile, post_profile } from '../controllers/profile_controller.js';

const profilerouter = express.Router();

profilerouter.get('/get-profile', get_profile);

profilerouter.post('/create-profile', post_profile);

profilerouter.patch('/update-profile', patch_profile)


export default profilerouter;