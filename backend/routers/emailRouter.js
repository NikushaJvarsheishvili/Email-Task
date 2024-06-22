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
import { csfrProtection } from "../middleware/csrfProtection.js";

emailRouter.post("/", verifyAuth, csfrProtection, emailsController);
emailRouter.get("/c/:emailCategory", verifyAuth, emailCategoryController);
emailRouter.get("/:emailId", verifyAuth, emailIdController);
emailRouter.patch(
  "/:emailId",
  verifyAuth,
  csfrProtection,
  emailPatchController
);
emailRouter.delete(
  "/delete/:emailId",
  verifyAuth,
  csfrProtection,
  emailDeleteController
);
