import Todo from "@/models/Todo";
import connectDB from "@/config/database";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  const { id } = await req.json();
  //console.log("resssssssssss: ", id);
  try {
    await connectDB();
    await Todo.findOneAndDelete({ _id: id });
    return new NextResponse("todo deleted", { status: 200 });
  } catch (err) {
    console.log(err);
    return new NextResponse("database err", { status: 500 });
  }
};
