import { healthIns, vehicleIns, travelIns } from "../models/claimsModel.js";
import { users } from "../models/userModel.js";
import { decoded_token } from "../utils/token_util.js"

export const get_claims = async (req, res) => {

    try {
        
        const decoded = decoded_token(req.cookies.token);
        const user = await users.findOne({ email: decoded.email }).lean();

        const heals = await healthIns.find({userID: user._id}, {type: 1, company: 1, policy_no: 1, status: 1, admin_comment: 1, createdAt: 1})

        const travels = await travelIns.find({userID: user._id}, {type: 1, company: 1, policy_no: 1, status: 1, admin_comment: 1, createdAt: 1})

        const vehicles = await vehicleIns.find({userID: user._id}, {type: 1, company: 1, policy_no: 1, status: 1, admin_comment: 1, createdAt: 1})

        const allClaims = [...heals, ...travels, ...vehicles];

        allClaims.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        return res.status(202).json({ 
            claims: allClaims
        });

    }
    catch (err) {
        console.error("Error in post_health:", err);
        return res.status(500).json({ mssg: 'Some Error Occured', error: err.message });
    }
}

export const post_health = async (req, res) => {

    try {
        
        const decoded = decoded_token(req.cookies.token);
        const user = await users.findOne({ email: decoded.email }).lean();

        if (!user) {
            return res.status(404).json({ mssg: 'User not found' });
        }

        const { 
            company, 
            policy,     
            p_name,      
            hosp_id,    
            hosp_name,  
            ad_date,     
            dis_date,   
            ailment, 
            claim,       
            user_story 
        } = req.body;


        const filePaths = req.files ? req.files.map(file => file.path) : [];

        await healthIns.create({
            userID: user._id,
            type: 'Health',
            company: company,
            policy_no: policy,        
            patient_name: p_name,     
            hospital_id: hosp_id,    
            hospital_name: hosp_name, 
            admission_date: ad_date,
            discharge_date: dis_date,
            ailment: ailment,
            claim_amount: claim,      
            user_story: user_story,
            image_url: filePaths      
        });

        return res.status(202).json({ 
            mssg: 'Claim Created Successfully'
        });

    }
    catch (err) {
        console.error("Error in post_health:", err);
        return res.status(500).json({ mssg: 'Some Error Occured', error: err.message });
    }
}

export const post_vehicle = async (req, res) => {

    try {
        
        const decoded = decoded_token(req.cookies.token);
        const user = await users.findOne({ email: decoded.email }).lean();

        if (!user) {
            return res.status(404).json({ mssg: 'User not found' });
        }

        const { 
            company, 
            policy,        
            incident_date, 
            driver_name, 
            driver_license, 
            vehicle_no, 
            claim,         
            user_story 
        } = req.body;

       
        const filePaths = req.files ? req.files.map(file => file.path) : [];

        await vehicleIns.create({
            userID: user._id,
            type: 'Vehicle',
            company: company,
            policy_no: policy,
            incident_date: incident_date,
            driver_name: driver_name,
            driver_license: driver_license,
            vehicle_no: vehicle_no,
            claim_amount: claim,
            user_story: user_story,
            image_url: filePaths,
            status: 'Pending'
        });

        return res.status(202).json({ 
            mssg: 'Vehicle Claim Created Successfully'
        });

    }
    catch (err) {
        console.error("Error in post_vehicle:", err);
        return res.status(500).json({ mssg: 'Some Error Occurred', error: err.message });
    }
}

export const post_travel = async (req, res) => {

    try {
        
        
        const decoded = decoded_token(req.cookies.token);
        const user = await users.findOne({ email: decoded.email }).lean();

        if (!user) {
            return res.status(404).json({ mssg: 'User not found' });
        }

        
        const { 
            company, 
            policy,        
            incident_date, 
            claim,          
            user_story 
        } = req.body;

        const filePaths = req.files ? req.files.map(file => file.path) : [];

        await travelIns.create({
            userID: user._id,
            type: 'Travel',
            company: company,
            policy_no: policy,
            incident_date: incident_date,
            claim_amount: claim,
            user_story: user_story,
            image_url: filePaths,
            status: 'Pending'
        });

        return res.status(202).json({ 
            mssg: 'Travel Claim Created Successfully'
        });

    }
    catch (err) {
        console.error("Error in post_travel:", err);
        return res.status(500).json({ mssg: 'Some Error Occurred', error: err.message });
    }
}