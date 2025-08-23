// database/config.ts
import mongoose from "mongoose";

let isConnected = false;

export async function connectDB() {
  if (isConnected) return;
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.warn("MONGODB_URI is not set. Skipping DB connection.");
    return; // let routes that don't need DB still work (e.g., /health)
  }
  await mongoose.connect(uri);
  isConnected = true;
}
