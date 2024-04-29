import express from "express";
import { verifyAuth } from "../../middleware/verifyAuth.js";
import { emailCategoryController } from "../../controller/email/emailCategoryController.js";

const emailCategoryRouter = express.Router();

emailCategoryRouter.get("/:emailCategory", verifyAuth, emailCategoryController);

export default emailCategoryRouter;
