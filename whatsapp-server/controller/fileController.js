const Grid = require("gridfs-stream");
const { default: mongoose } = require("mongoose");
const slugify = require('slugify')

//create a stream for image extraction
let gfs, gridFsBucket;
const conn = mongoose.connection;
conn.once('open', () => {
    gridFsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: 'fs'
    })
    gfs = Grid(conn.db, mongoose.mongo)
    gfs.collection('fs')
})

const uploadFile = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(200).json({ output: "File dosen't exist!" })
        }
        const imageUrl = `${process.env.SERVER_URL}/file/${slugify(req.file.filename, { lower: true, })}`
        return res.status(200).json(imageUrl)
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}
const getFile = async (req, res) => {
    try {
        const file = await gfs.files.findOne({ filename: req.params.filename });
        const readStream = gridFsBucket.openDownloadStream(file._id);
        readStream.pipe(res)
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}
module.exports = { uploadFile, getFile }