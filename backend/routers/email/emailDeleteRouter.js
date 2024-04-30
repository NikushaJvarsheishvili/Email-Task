import express from "express";
import { emailDeleteController } from "../../controller/email/emailDeleteController.js";
import { verifyAuth } from "../../middleware/verifyAuth.js";

const emailDeleteRouter = express.Router();

emailDeleteRouter.delete("/:emailId", verifyAuth, emailDeleteController);

export default emailDeleteRouter;
