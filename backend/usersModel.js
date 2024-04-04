import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({
  email: {
    required: true,
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
});

export const usersModel = mongoose.model("users", usersSchema);
