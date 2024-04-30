import { emailsModel } from "../../models/emailsModel.js";
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
    const archivedEmail = await emailsModel.find({ archived: true }).populate({
      path: "sender",
      select: "-password",
    });
    res.json({ emails: archivedEmail });
  }
});
