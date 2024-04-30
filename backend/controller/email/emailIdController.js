import { emailsModel } from "../../models/emailsModel.js";
import asyncHandler from "express-async-handler";

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
