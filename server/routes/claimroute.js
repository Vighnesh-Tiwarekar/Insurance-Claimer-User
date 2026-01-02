import express from 'express'
import { get_claims, post_health, post_travel, post_vehicle } from '../controllers/claims_controller.js';
import { upload } from '../middleware/upload.js';



const claimrouter = express.Router();

claimrouter.get('/get-claims', get_claims)

claimrouter.post('/health-claim', upload.array('documents', 5) ,  post_health)

claimrouter.post('/vehicle-claim', upload.array('documents', 5) , post_vehicle)

claimrouter.post('/travel-claim', upload.array('documents', 5) , post_travel)

export default claimrouter;