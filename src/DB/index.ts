import mongoose from 'mongoose';

// connecting to database
const connectDB = async () => {
    const connectionUrl = process.env.DB_URI||'';
    return mongoose.connect(connectionUrl, {})
        .then(() => console.log(`Database connected successfully`))
        .catch((err) => console.log("Getting Error from DB connection" + err.message))
};

export default connectDB;