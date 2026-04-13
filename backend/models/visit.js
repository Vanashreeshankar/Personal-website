import mongoose from "mongoose";

const visitSchema = new mongoose.Schema({
  ref: String,
  ip: String,
  city: String,
  country: String,
  userAgent: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Visit", visitSchema);