import Todo from "@/models/Todo";
import connectDB from "@/config/database";
import { NextResponse } from "next/server";

export const PUT = async (req) => {
  const { id, todo } = await req.json();
  //console.log("dataaaaaaaaaaaaa:", data);
  console.log(id, todo);
  try {
    await connectDB();
    await Todo.findOneAndUpdate(
      { _id: id },
      {
        todo: todo,
      }
    );
    return new NextResponse("todo updated", { status: 200 });
  } catch (err) {
    return new NextResponse("database err", { status: 500 });
  }
};
