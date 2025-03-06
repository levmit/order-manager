import mongoose from "mongoose";
import { connectDB } from "../src/config/db";

const dropDB = async () => {
  await connectDB(); // Connect to MongoDB
  await mongoose.connection.dropDatabase(); // Drop the database
  console.log("Database dropped successfully");
  process.exit(0); // Exit the script
};

dropDB();
