"use server";

import mongoose from "mongoose";

// singleton connection
let isConnected = false;
export const connectToDatabase = async () => {
  console.log(process.env.MONGODB_URL)
  if (!process.env.MONGODB_URL) {

    throw new Error("MONGODB_URL is not set");
  }
  if (isConnected) {
    console.log("MONGODB is already connected");
    return;
  }
  try {
    await mongoose.connect(process.env.MONGODB_URL, {

      dbName: "ucademy",
    });
    isConnected = true;
    console.log("Using new database connection");
  } catch (error) {
    console.error('Error while connecting to database:', {
      message: error.message,
      stack: error.stack,
    });
  }
};
