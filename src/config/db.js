const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`✅ MongoDB u lidh në: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Gabim: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;
