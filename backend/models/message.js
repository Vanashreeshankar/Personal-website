import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  service: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    enum: [
      "frontend",
      "fullstack",
      "web ",
      "landing page",
      "ui/ux",
    ],
  },
  jobType: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    enum: ["full-time", "freelance", "contract", "part-time"],
  },
  message: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Message", messageSchema);