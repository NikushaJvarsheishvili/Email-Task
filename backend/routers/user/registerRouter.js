import express from "express";
import { registerController } from "../../controller/user/registerController.js";
import { validateSchema } from "../../middleware/validateSchema.js";
import { registerSchema } from "../../YupSchema/registerSchema.js";

const registerRouter = express.Router();

registerRouter.post("/", validateSchema(registerSchema), registerController);

export default registerRouter;
