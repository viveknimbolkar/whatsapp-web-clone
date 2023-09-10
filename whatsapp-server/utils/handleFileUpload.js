require('dotenv').config()
const multer = require('multer')
const { GridFsStorage } = require('multer-gridfs-storage');
const { default: slugify } = require('slugify');

// setup mongodb storage
const storage = new GridFsStorage({
    url: process.env.MONGODB_URI,
    options: {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    },
    file: (req, file) => {
        // check file formats
        const supportedFileFormats = ['image/png', 'image/jpg', 'image/jpeg'];
        if (supportedFileFormats.indexOf(file.mimeType) === -1) {
            return `${slugify(file.originalname, { lower: true })}-${Date.now()}`
        }
        return {
            bucketName: 'photos',
            filename: `${slugify(file.originalname, { lower: true })}-${Date.now()}`,
        }
    }
});

module.exports = multer({ storage })