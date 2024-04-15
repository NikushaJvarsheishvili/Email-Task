import express from "express";
import { verifyAuth } from "../../middleware/verifyAuth.js";

const statusRouter = express.Router();

statusRouter.get("/", verifyAuth, async (req, res) => {
  res.json({ user: req.user });
});

export default statusRouter;
