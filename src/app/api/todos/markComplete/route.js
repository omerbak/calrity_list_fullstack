import Todo from "@/models/Todo";
import connectDB from "@/config/database";
import { NextResponse } from "next/server";

export const PUT = async (req) => {
  const { id } = await req.json();
  //console.log("dataaaaaaaaaaaaa:", data);
  console.log("id", id);
  try {
    await connectDB();
    await Todo.findOneAndUpdate(
      { _id: id },
      {
        completed: true,
      }
    );
    return new NextResponse("marked complete", { status: 200 });
  } catch (err) {
    return new NextResponse("database err", { status: 500 });
  }
};
