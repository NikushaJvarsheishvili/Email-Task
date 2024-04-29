import express from "express";
import { verifyAuth } from "../../middleware/verifyAuth.js";
import { statusController } from "../../controller/user/statusController.js";

const statusRouter = express.Router();

statusRouter.get("/", verifyAuth, statusController);

export default statusRouter;
