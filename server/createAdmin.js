import mongoose from "mongoose";
import dotenv from "dotenv";
import { Admin } from "./models/adminModel.js";
import { encrypt_pass } from "./utils/password_util.js";

dotenv.config();

const createAdminUser = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URL);
        console.log('Connected to database');

        // Check if admin already exists
        const existingAdmin = await Admin.findOne({ email: 'admin@insurecare.com' });
        
        if (existingAdmin) {
            console.log('Admin user already exists!');
            process.exit(0);
        }

        // Hash the password
        const hashedPassword = await encrypt_pass('Admin@123');

        // Create admin user
        const admin = new Admin({
            email: 'admin@insurecare.com',
            password: hashedPassword,
            role: 'admin'
        });

        await admin.save();
        
        console.log('Admin user created successfully!');
        console.log('Email: admin@insurecare.com');
        console.log('Password: Admin@123');
        
        process.exit(0);
    } catch (error) {
        console.error('Error creating admin user:', error);
        process.exit(1);
    }
};

createAdminUser();
