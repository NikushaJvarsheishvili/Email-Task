import express from "express";
import { verifyAuth } from "../../middleware/verifyAuth.js";
import { emailsModel } from "../../models/emailsModel.js";

const emailCategoryRouter = express.Router();

emailCategoryRouter.get("/:emailCategory", verifyAuth, async (req, res) => {
  const { emailCategory } = req.params;
  const user = req.user;
  console.log(emailCategory);

  try {
    if (emailCategory === "inbox") {
      const inboxEmails = await emailsModel
        .find({ recipients: user.email })
        .populate({
          path: "sender",
          select: "-password",
        });
      res.json({ emails: inboxEmails });
    } else if (emailCategory === "sent") {
      const sentEmail = await emailsModel.find({ sender: user._id });
      res.json({ emails: sentEmail });
    } else if (emailCategory === "archived") {
      const archivedEmail = await emailsModel.find({ archived: true });
      // res.json({ emails: archivedEmail });
      // res.json({ emails: [] });
    }
  } catch (error) {
    console.log(error.message);
  }
});

export default emailCategoryRouter;
