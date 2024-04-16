import mongoose from "mongoose";

const emailsSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    recipients: Array,
    subject: String,
    body: String,
    archived: {
      default: false,
      type: Boolean,
    },
  },
  { timestamps: true }
);

export const emailsModel = mongoose.model("emails", emailsSchema);
