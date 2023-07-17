// config/cloudinary.config.js

const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({ 
    cloud_name: 'devjy7hwv', 
    api_key: '937658318424121', 
    api_secret: 'ENH_Va8Nc-Uit1nF4C70dqakBlw' 
  });

const storage = new CloudinaryStorage({
  // cloudinary: cloudinary,
  cloudinary,
  params: {
    allowed_formats: ['jpg', 'png', 'webp'],
    folder: 'movie-project' // The name of the folder in cloudinary
    // resource_type: 'raw' => this is in case you want to upload other type of files, not just images
  }
});

//                     storage: storage
module.exports = multer({ storage });
