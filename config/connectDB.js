import mongoose from "mongoose";

const connectDB = async (fileName) => {
    try {
        await mongoose.connect(fileName);
        console.log(`Mongo DB connection successful: ${mongoose.connection.host}`)
    } catch (error) {
        console.log(`Mongo DB connection failed: ${error}`)
    }
}

export default connectDB;