import { usersModel } from "../models/usersModel.js";

export const verifyAuth = async (req, res, next) => {
  const { session } = req;

  if (!session.userId) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  req.user = await usersModel.findById(session.userId).select("-password");

  next();
};
