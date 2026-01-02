import multer from 'multer';
import path from 'path';

// 1. Define Storage Engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Save files to the 'uploads' folder in your server root
    // Make sure you create this folder manually or use fs to create it!
    cb(null, 'uploads/'); 
  },
  filename: function (req, file, cb) {
    // Rename file to avoid conflicts: uniqueSuffix + original extension
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

// 2. Initialize Multer
// 'documents' must match the name used in formData.append('documents', file) on frontend
export const upload = multer({ storage: storage });