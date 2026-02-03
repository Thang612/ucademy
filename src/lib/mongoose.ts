"use server"
import mongoose from "mongoose";
import dns from "node:dns/promises";

// Set well-known public DNS servers (Cloudflare and Google)
dns.setServers(["1.1.1.1", "8.8.8.8"]);

const connectionToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL as string)
    console.log("Connected successful")
  } catch (error) {
    console.log("Connected failed", error)
  }
}

export default connectionToDatabase