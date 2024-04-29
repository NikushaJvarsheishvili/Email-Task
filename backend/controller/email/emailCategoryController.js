import { emailsModel } from "../../models/emailsModel.js";

export const emailCategoryController = async (req, res) => {
  const { emailCategory } = req.params;
  const user = req.user;

  try {
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
        .find({ archived: true })
        .populate({
          path: "sender",
          select: "-password",
        });
      res.json({ emails: archivedEmail });
    }
  } catch (error) {
    console.log(error.message);
  }
};
