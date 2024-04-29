import express from "express";
import { verifyAuth } from "../../middleware/verifyAuth.js";
import { emailsController } from "../../controller/email/emailsController.js";

const emailsRouter = express.Router();

emailsRouter.post("/", verifyAuth, emailsController);

export default emailsRouter;
