import express from "express";
import { loginController } from "../../controller/user/loginController.js";
import { validateSchema } from "../../middleware/validateSchema.js";
import { loginSchema } from "../../YupSchema/loginSchema.js";

const loginRouter = express.Router();

loginRouter.post("/", validateSchema(loginSchema), loginController);

export default loginRouter;
