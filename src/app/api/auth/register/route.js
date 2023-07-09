import User from "@/models/User";
import connectDB from "@/config/database";
const bcrypt = require("bcrypt");
import { NextResponse } from "next/server";

export const POST = async (req) => {
  const { username, email, password } = await req.json();
  connectDB();
  const hasedPass = await bcrypt.hash(password, 5);
  const newUser = new User({
    username,
    email,
    password: hasedPass,
  });
  try {
    await newUser.save();
    return new NextResponse("user has been created", {
      status: 201,
    });
  } catch (err) {
    return new NextResponse(err.message, {
      status: 500,
    });
  }
};
