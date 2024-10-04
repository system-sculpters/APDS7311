const mongoose = require('mongoose')
const ATLAS_URI = process.env.ATLAS_URI

const connectDB = async () =>{
    try {
        await mongoose.connect(ATLAS_URI);
        console.log('mongoDB is CONNECTED!!! :)')
    } catch (err) {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    }
}

module.exports = { connectDB }
