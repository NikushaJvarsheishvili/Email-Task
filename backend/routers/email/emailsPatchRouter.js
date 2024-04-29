import express from "express";
import { emailPatchController } from "../../controller/email/emailsPatchController.js";
import { verifyAuth } from "../../middleware/verifyAuth.js";

const emailsPatchRouter = express.Router();

emailsPatchRouter.patch("/:emailId", verifyAuth, emailPatchController);

export default emailsPatchRouter;
