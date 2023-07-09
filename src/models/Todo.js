import mongoose from "mongoose";
const { Schema } = mongoose;

const todoSchema = new Schema({
  todo: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
});

export default mongoose.models.Todo || mongoose.model("Todo", todoSchema);
