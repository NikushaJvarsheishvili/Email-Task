import bcrypt from "bcrypt";
import { usersModel } from "../../models/usersModel.js";
import asyncHandler from "express-async-handler";

export const loginController = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const loginUser = await usersModel.findOne({ email }).lean();

  if (loginUser) {
    const comparePassword = await bcrypt.compare(password, loginUser.password);

    if (loginUser && comparePassword) {
      const { password, ...rest } = loginUser;
      req.session.userId = rest._id.toString();
      res.json({ user: rest });
    }
  }
});
