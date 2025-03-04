const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary');
const path = require('path');

// Temporary Local Storage in "public/images/"
const localStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images/'); // Store temporarily
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Keep original filename
  },
});

//  Middleware for handling file uploads
const uploadMiddleware = projectName => {
  return multer({
    storage: localStorage, // First store locally
    fileFilter: (req, file, cb) => {
      if (file.mimetype.startsWith('image/')) {
        cb(null, true);
      } else {
        cb(new Error('Only image files are allowed!'), false);
      }
    },
  }).single('image');
};

module.exports = { uploadMiddleware };
