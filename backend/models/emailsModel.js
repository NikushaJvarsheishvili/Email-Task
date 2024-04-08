import mongoose from "mongoose";

const emailsSchema = new mongoose.Schema(
  {
    sender: Object,
    recipients: Array,
    subject: String,
    body: String,
    archived: Boolean,
  },
  { timestamps: true }
);

export const emailsModel = mongoose.model("emails", emailsSchema);
