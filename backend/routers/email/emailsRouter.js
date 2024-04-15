import express from "express";
import { verifyAuth } from "../../middleware/verifyAuth.js";
import { emailsModel } from "../../models/emailsModel.js";

const emailsRouter = express.Router();

emailsRouter.post("/", verifyAuth, async (req, res) => {
  const newBody = req.body;
  const senderId = req.user._id;

  try {
    const newEmails = new emailsModel({ ...newBody, sender: senderId });
    await newEmails.save();

    console.log(newEmails);
    res.json({ message: "email sent", email: newEmails });
  } catch (error) {
    console.log(error.message);
  }
});

export default emailsRouter;
