import User from "@/models/User";
import connectDB from "@/config/database";
const bcrypt = require("bcrypt");
import { NextResponse } from "next/server";
import validator from "validator";

export const POST = async (req, res) => {
  const { username, email, password } = await req.json();
  const validationErrors = [];
  if (!validator.isEmail(email))
    validationErrors.push({ msg: "Please enter a valid email address." });
  if (!validator.isLength(password, { min: 8 }))
    validationErrors.push({
      msg: "Password must be at least 8 characters long",
    });
  /* if (req.body.password !== req.body.confirmPassword) validationErrors.push({ msg: 'Passwords do not match' }) */
  if (validationErrors.length) {
    console.log(validationErrors);
    return new NextResponse("validation error", {
      status: 400,
      statusText: validationErrors[0].msg,
    });
  }
  connectDB();
  const dbUser = await User.findOne({ email: email });
  if (dbUser) {
    console.log(dbUser);
    validationErrors.push({ msg: "User already exit" });
    return new NextResponse("validation error", {
      status: 400,
      statusText: validationErrors[0].msg,
    });
  }
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
      statusText: "User have been created succefully",
    });
  } catch (err) {
    return new NextResponse(err.message, {
      status: 500,
    });
  }
};
