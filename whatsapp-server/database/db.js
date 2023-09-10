const mongoose = require('mongoose')

const connection = async () => {

    try {
        await mongoose.connect(process.env.MONGODB_URI, { useUnifiedTopology: true })
    } catch (error) {
        console.log(error);
    }
}

module.exports = connection