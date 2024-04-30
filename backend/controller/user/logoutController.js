import asyncHandler from "express-async-handler";

export const logoutController = asyncHandler(async (req, res) => {
  req.session.destroy();
  res.clearCookie("connect.sid");

  res.json({ message: "Logged Out" });
});
