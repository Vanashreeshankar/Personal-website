import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.c9ygt.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

    const conn = await mongoose.connect(uri);

    console.log("MongoDB Connected ✅");
    console.log("DB Name:", conn.connection.name); //  correct way
  } catch (error) {
    console.error("DB connection error ❌", error.message);
    process.exit(1);
  }
};

export default connectDB;