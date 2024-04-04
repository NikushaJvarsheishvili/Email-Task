import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { usersModel } from "./usersModel.js";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.get("/users", async (req, res) => {
  const users = await usersModel.find();

  console.log(users);
  res.json({ message: "Hello Nika" });
});

app.post("/users/create-user", async (req, res) => {
  const newUserInfo = req.body;

  try {
    const newUser = new usersModel(newUserInfo);
    await newUser.save();

    res.json({ message: "account created successfully" });
  } catch (error) {
    console.log(error.message);
  }
});

app.listen(3000, async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/emailTask");
    console.log("mongoose connected");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
});
