import bcrypt from "bcrypt";
import { usersModel } from "../../models/usersModel.js";
import asyncHandler from "express-async-handler";

export const registerController = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 12);

  const checkUser = await usersModel.findOne({ email });

  if (!checkUser) {
    const newUser = new usersModel({ email, password: hashedPassword });
    await newUser.save();

    res.json({ message: "account created successfully" });
  } else {
    res.status(409).json({ message: "Email already registered" });
  }
});
