import express from "express";

const logoutRouter = express.Router();

logoutRouter.delete("/", async (req, res) => {
  req.session.destroy();
  res.clearCookie("connect.sid");

  res.json({ message: "Logged Out" });
});

export default logoutRouter;
