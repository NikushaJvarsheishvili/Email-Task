import bcrypt from "bcrypt";
import { usersModel } from "../models/usersModel.js";
import asyncHandler from "express-async-handler";
import crypto from "crypto";

export const logoutController = asyncHandler(async (req, res) => {
  req.session.destroy();
  res.clearCookie("connect.sid");
  res.json({ message: "Logged Out" });
});

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

export const loginController = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const loginUser = await usersModel.findOne({ email }).lean();

  if (loginUser) {
    const comparePassword = await bcrypt.compare(password, loginUser.password);

    if (loginUser && comparePassword) {
      const { password, ...rest } = loginUser;
      req.session.userId = rest._id.toString();
      req.session.csrfToken = crypto.randomBytes(32).toString("hex");
      res.setHeader("X-CSRF-Token", req.session.csrfToken);
      res.json({ user: rest });
    }
  }
});

export const statusController = asyncHandler(async (req, res) => {
  res.setHeader("X-CSRF-Token", req.session?.csrfToken);
  return res.json({ user: req.user });
});
