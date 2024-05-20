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

userRouter.post("/login", validateSchema(loginSchema), loginController);
userRouter.delete("/logout", logoutController);
userRouter.post(
  "/register",
  validateSchema(registerSchema),
  registerController
);
userRouter.get("/status", verifyAuth, statusController);
