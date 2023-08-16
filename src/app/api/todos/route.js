import User from "@/models/User";
import Todo from "@/models/Todo";
import connectDB from "@/config/database";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  const url = new URL(req.url);
  const email = url.searchParams.get("email");
  /* console.log(email); */

  try {
    await connectDB();
    const user = await User.findOne({ email: email });
    const todos = await Todo.find({ userId: user._id.toString() });
    //console.log(todos);
    return new NextResponse(JSON.stringify(todos), { status: 200 });
  } catch (err) {
    return new NextResponse("database err", { status: 500 });
  }
};

export const POST = async (req) => {
  const { email, todoText } = await req.json();
  try {
    await connectDB();
    const user = await User.findOne({ email: email });
    //console.log(user._id.toString());
    const todo = new Todo({
      userId: user._id.toString(),
      todo: todoText,
      completed: false,
    });
    await todo.save();
    return new NextResponse("success, user was created", { status: 201 });
  } catch (err) {
    console.log(err);
    return new NextResponse("database err", { status: 500 });
  }
  //console.log(data);
};
