import express from "express";
import { emailsModel } from "../../models/emailsModel.js";

const emailIdRouter = express.Router();

emailIdRouter.get("/:emailId", async (req, res) => {
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

export default emailIdRouter;