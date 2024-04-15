import express from "express";
import bcrypt from "bcrypt";
import { usersModel } from "../../models/usersModel.js";

const registerRouter = express.Router();

registerRouter.post("/", async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 12);

  try {
    const newUser = new usersModel({ email, password: hashedPassword });
    await newUser.save();

    res.json({ message: "account created successfully" });
  } catch (error) {
    console.log(error.message);
  }
});

export default registerRouter;
