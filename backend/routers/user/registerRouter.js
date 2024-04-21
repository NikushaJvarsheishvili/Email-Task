import express from "express";
import bcrypt from "bcrypt";
import { usersModel } from "../../models/usersModel.js";

const registerRouter = express.Router();

registerRouter.post("/", async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 12);

  try {
    const checkUser = await usersModel.findOne({ email });

    if (!checkUser) {
      const newUser = new usersModel({ email, password: hashedPassword });
      await newUser.save();

      res.json({ message: "account created successfully" });
    } else {
      res.status(409).json({ message: "Email already registered" });
    }
  } catch (error) {
    console.log(error.message);
  }
});

export default registerRouter;
