import { Admin } from "../models/adminModel.js";
import { healthIns, vehicleIns, travelIns } from "../models/claimsModel.js";
import { users } from "../models/userModel.js";
import { validate_pass } from "../utils/password_util.js";
import { generate_token } from "../utils/token_util.js";

export const admin_login = async (req, res) => {
    try {
        const data = req.body;

        const admin = await Admin.findOne({ email: data.email }).lean();

        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }

        if (await validate_pass(admin.password, data.password)) {
            const token = generate_token({ email: data.email, role: 'admin' }, '12h');

            return res.status(200).cookie('admin_token', token, {
                httpOnly: true,
                sameSite: 'Lax',
                secure: false,
                path: '/',
                maxAge: 1000 * 60 * 60 * 12
            }).json({ 
                message: 'Login Successful',
                token: token
            });
        }

        return res.status(401).json({ message: 'Incorrect Password' });

    } catch (err) {
        console.log('Error', err);
        return res.status(500).json({ message: 'Some Error Occurred' });
    }
};

export const get_all_claims = async (req, res) => {
    try {
        const { type, status } = req.query;

        let healthClaims = [];
        let vehicleClaims = [];
        let travelClaims = [];

        // Build query filter
        const filter = {};
        if (status && status !== 'all') {
            filter.status = status;
        }

        // Fetch claims based on type
        if (!type || type === 'health') {
            healthClaims = await healthIns.find(filter)
                .populate('userID', 'email')
                .sort({ createdAt: -1 })
                .lean();
        }

        if (!type || type === 'vehicle') {
            vehicleClaims = await vehicleIns.find(filter)
                .populate('userID', 'email')
                .sort({ createdAt: -1 })
                .lean();
        }

        if (!type || type === 'travel') {
            travelClaims = await travelIns.find(filter)
                .populate('userID', 'email')
                .sort({ createdAt: -1 })
                .lean();
        }

        const allClaims = [...healthClaims, ...travelClaims, ...vehicleClaims];
        allClaims.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        return res.status(200).json({ 
            claims: allClaims,
            total: allClaims.length
        });

    } catch (err) {
        console.log('Error', err);
        return res.status(500).json({ message: 'Some Error Occurred' });
    }
};

export const update_claim_status = async (req, res) => {
    try {
        const { claimId, status, admin_comment } = req.body;
        const { type } = req.query;

        if (!claimId || !status || !type) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        let claim;
        const updateData = {
            status: status,
            admin_comment: admin_comment || ''
        };

        if (type === 'Health') {
            claim = await healthIns.findByIdAndUpdate(claimId, updateData, { new: true });
        } else if (type === 'Vehicle') {
            claim = await vehicleIns.findByIdAndUpdate(claimId, updateData, { new: true });
        } else if (type === 'Travel') {
            claim = await travelIns.findByIdAndUpdate(claimId, updateData, { new: true });
        } else {
            return res.status(400).json({ message: 'Invalid claim type' });
        }

        if (!claim) {
            return res.status(404).json({ message: 'Claim not found' });
        }

        return res.status(200).json({ 
            message: 'Claim status updated successfully',
            claim: claim
        });

    } catch (err) {
        console.log('Error', err);
        return res.status(500).json({ message: 'Some Error Occurred' });
    }
};
