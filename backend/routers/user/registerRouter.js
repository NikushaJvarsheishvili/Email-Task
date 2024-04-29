import express from "express";
import { registerController } from "../../controller/user/registerController.js";

const registerRouter = express.Router();

registerRouter.post("/", registerController);

export default registerRouter;
