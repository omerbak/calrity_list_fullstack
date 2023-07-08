import mongoose from "mongoose";

async function connectDB() {
  try {
    const connect = mongoose.connect(process.env.MOGO);
  } catch (err) {
    throw new Error(err);
  }
}
