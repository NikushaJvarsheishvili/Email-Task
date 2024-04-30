import { emailsModel } from "../../models/emailsModel.js";
import asyncHandler from "express-async-handler";

export const emailDeleteController = asyncHandler(async (req, res) => {
  const emailDelete = await emailsModel.findByIdAndDelete(req.params.emailId);

  res.json({ message: "email was deleted" });
});
