import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const mongodb_url = process.env.MONGODB_URL!;

async function connectToDatabase() {
  try {
    await mongoose.connect(mongodb_url);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Cannot connect to MongoDB", error);
    throw new Error("Cannot connect to MongoDB");
  }
}

async function disconnectFromDatabase() {
  try {
    await mongoose.disconnect();
  } catch (error) {
    console.log(error);
    throw new Error("Cannot disconnect from MongoDB");
  }
}
connectToDatabase();
