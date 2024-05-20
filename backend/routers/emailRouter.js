import express from "express";
export const emailRouter = express.Router();
import { verifyAuth } from "../middleware/verifyAuth.js";
import {
  emailCategoryController,
  emailDeleteController,
  emailIdController,
  emailPatchController,
  emailsController,
} from "../controller/emailController.js";

emailRouter.post("/", verifyAuth, emailsController);
emailRouter.get("/c/:emailCategory", verifyAuth, emailCategoryController);
emailRouter.get("/:emailId", verifyAuth, emailIdController);
emailRouter.patch("/:emailId", verifyAuth, emailPatchController);
emailRouter.delete("/delete/:emailId", verifyAuth, emailDeleteController);
