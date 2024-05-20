import { emailsModel } from "../models/emailsModel.js";
import asyncHandler from "express-async-handler";

export const emailCategoryController = asyncHandler(async (req, res) => {
  const { emailCategory } = req.params;
  const user = req.user;

  if (emailCategory === "inbox") {
    const inboxEmails = await emailsModel
      .find({ recipients: user.email, archived: false })
      .populate({
        path: "sender",
        select: "-password",
      });
    res.json({ emails: inboxEmails });
  } else if (emailCategory === "sent") {
    const sentEmail = await emailsModel.find({ sender: user._id });
    res.json({ emails: sentEmail });
  } else if (emailCategory === "archived") {
    const archivedEmail = await emailsModel
      .find({ recipients: user.email, archived: true })
      .populate({
        path: "sender",
        select: "-password",
      });
    res.json({ emails: archivedEmail });
  }
});

export const emailDeleteController = asyncHandler(async (req, res) => {
  const emailDelete = await emailsModel.findByIdAndDelete(req.params.emailId);

  res.json({ message: "email was deleted" });
});

export const emailIdController = asyncHandler(async (req, res) => {
  const { emailId } = req.params;

  try {
    const emailFindById = await emailsModel
      .findById(emailId)
      .populate({ path: "sender", select: "-password" });

    res.json({ email: emailFindById });
  } catch (error) {
    console.log(error.message);
  }
});

export const emailsController = asyncHandler(async (req, res) => {
  const newBody = req.body;
  const { sender, recipients, subject, body, archived } = req.body;
  const senderId = req.user._id;

  console.log(newBody.recipients.split(", "));
  try {
    if (newBody._id) {
      delete newBody._id;
    }

    const newEmails = new emailsModel({
      ...newBody,
      sender: senderId,
      recipients: newBody.recipients.split(","),
    });
    await newEmails.save();

    res.json({ message: "email sent", email: newEmails });
  } catch (error) {
    console.log(error.message);
  }
});

export const emailPatchController = asyncHandler(async (req, res) => {
  const { emailId } = req.params;
  const archived = req.body;

  try {
    const updateEmail = await emailsModel
      .findByIdAndUpdate(emailId, archived, {
        new: true,
      })
      .populate({ path: "sender", select: "-password" });

    await updateEmail.save();

    res.json({ email: updateEmail });
  } catch (err) {
    console.log(err.message);
    res.json({ message: null });
  }
});
