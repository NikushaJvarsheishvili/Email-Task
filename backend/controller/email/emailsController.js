import { emailsModel } from "../../models/emailsModel.js";
import asyncHandler from "express-async-handler";

export const emailsController = asyncHandler(async (req, res) => {
  const newBody = req.body;
  const { sender, recipients, subject, body, archived } = req.body;
  const senderId = req.user._id;

  try {
    if (newBody._id) {
      delete newBody._id;
    }

    const newEmails = new emailsModel({
      ...newBody,
      sender: senderId,
      recipients: newBody.recipients.split(", "),
    });
    await newEmails.save();

    res.json({ message: "email sent", email: newEmails });
  } catch (error) {
    console.log(error.message);
  }
});