import express from "express";
export const userRouter = express.Router();
import { loginSchema } from "../YupSchema/loginSchema.js";
import { registerSchema } from "../YupSchema/registerSchema.js";
import { validateSchema } from "../middleware/validateSchema.js";
import { verifyAuth } from "../middleware/verifyAuth.js";
import {
  loginController,
  logoutController,
  registerController,
  statusController,
} from "../controller/userController.js";
import { csfrProtection } from "../middleware/csrfProtection.js";

userRouter.post("/login", validateSchema(loginSchema), loginController);
userRouter.delete("/logout", csfrProtection, logoutController);
userRouter.post(
  "/register",
  validateSchema(registerSchema),
  registerController
);
userRouter.get("/status", verifyAuth, statusController);
