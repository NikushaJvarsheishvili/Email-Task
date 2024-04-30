import asyncHandler from "express-async-handler";

export const statusController = asyncHandler(async (req, res) => {
  return res.json({ user: req.user });
});
