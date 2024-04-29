import express from "express";
import { logoutController } from "../../controller/user/logoutController.js";

const logoutRouter = express.Router();

logoutRouter.delete("/", logoutController);

export default logoutRouter;
