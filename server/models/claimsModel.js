import mongoose from "mongoose";

const healthInsSchema = new mongoose.Schema({

    userID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },

    type: {
        type: String,
        required: true,
        default: 'Health'
    },

    company: {
        type: String,
        required: true
    },

    policy_no: {
        type: String,
        required: true
    },

    patient_name: {
        type: String,
        required: true
    },

    hospital_id: {
        type: String,
        required: true
    },

    hospital_name: {
        type: String,
        required: true
    },

    admission_date: {
        type: Date,
        required: true
    },

    discharge_date: {
        type: Date,
        required: true
    },

    ailment: {
        type: String,
        required: true
    },

    claim_amount: {
        type: Number,
        required: true
    },

    user_story: {
        type: String,
        required: true
    },

    medical_bill_url: {
        type: String,
        required: true
    },

    medical_report_url: {
        type: String,
        required: true
    },

    status: {
        type: String,
        enum: ['Pending', 'Under Review', 'Approved', 'Rejected'],
        default: 'Pending'
    },

    admin_comment: {
        type: String, 
        default: ""
    }

},
{
    timestamps: true,
    collection: 'healthIns'
});


const vehicleInsSchema = new mongoose.Schema({

    userID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },

    type: {
        type: String,
        required: true,
        default: 'Vehicle'
    },

    company: {
        type: String,
        required: true
    },

    policy_no: {
        type: String,
        required: true
    },

    wheeler_type: {
        type: String,
        required: true
    },

    incident_date: {
        type: Date,
        required: true
    },

    driver_name: {
        type: String,
        required: true
    },

    driver_license: {
        type: String,
        required: true
    },

    vehicle_no: {
        type: String,
        required: true
    },

    claim_amount: {
        type: Number,
        required: true
    },

    image_url: {
        type: [String],
        required: true
    },

    user_story: {
        type: String,
        required: true
    },

    damage_desc: {
        type: String,
        required: true
    },

    status: {
        type: String,
        enum: ['Pending', 'Under Review', 'Approved', 'Rejected'],
        default: 'Pending'
    },

    admin_comment: {
        type: String, 
        default: ""
    }

},
{
    timestamps: true,
    collection: 'vehicleIns'
});

const travelInsSchema = new mongoose.Schema({

    userID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },

    type: {
        type: String,
        required: true,
        default: 'Travel'
    },

    company: {
        type: String,
        required: true
    },

    policy_no: {
        type: String,
        required: true
    },

    travel_type: {
        type: String,
        enum: ['Domestic', 'International'],
        required: true
    },

    incident_date: {
        type: Date,
        required: true
    },

    claim_amount: {
        type: Number,
        required: true
    },

    user_story: {
        type: String,
        required: true
    },

    ticket_url: {
        type: String,
        required: true
    },

    passport_url: {
        type: String,
        default: null
    },

    visa_url: {
        type: String,
        default: null
    },

    status: {
        type: String,
        enum: ['Pending', 'Under Review', 'Approved', 'Rejected'],
        default: 'Pending'
    },

    admin_comment: {
        type: String, 
        default: ""
    }

},
{
    timestamps: true,
    collection: 'travelIns'
});

export const healthIns = new mongoose.model('healthIns', healthInsSchema)

export const vehicleIns = new mongoose.model('vehicleIns', vehicleInsSchema)

export const travelIns = new mongoose.model('travelIns', travelInsSchema)