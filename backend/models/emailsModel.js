import mongoose from "mongoose";

const emailsSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    recipients: [String],
    subject: String,
    body: String,
    archived: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const emailsModel = mongoose.model("emails", emailsSchema);
