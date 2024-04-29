import express from "express";
import { emailIdController } from "../../controller/email/emailIdController.js";
import { verifyAuth } from "../../middleware/verifyAuth.js";

const emailIdRouter = express.Router();

emailIdRouter.get("/:emailId", verifyAuth, emailIdController);

export default emailIdRouter;
