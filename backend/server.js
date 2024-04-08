import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import session from "express-session";
import MongoStore from "connect-mongo";
import bcrypt from "bcrypt";

import { usersModel } from "./models/usersModel.js";
import { verifyAuth } from "./middleware/verifyAuth.js";
import { emailsModel } from "./models/emailsModel.js";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(
  session({
    secret: "super secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 2,
      httpOnly: true,
    },
    store: MongoStore.create({
      mongoUrl: "mongodb://127.0.0.1:27017/emailTask",
    }),
  })
);

app.get("/user/status", verifyAuth, async (req, res) => {
  res.json({ user: req.user });
});

app.post("/user/register", async (req, res) => {
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

app.post("/user/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const loginUser = await usersModel.findOne({ email }).lean();

    if (loginUser) {
      const comparePassword = await bcrypt.compare(
        password,
        loginUser.password
      );

      if (loginUser && comparePassword) {
        const { password, ...rest } = loginUser;
        req.session.userId = rest._id.toString();
        res.json({ user: rest });
      }
    }
  } catch (error) {
    console.log(error.message);
  }
});

app.delete("/user/logout", async (req, res) => {
  req.session.destroy();
  res.clearCookie("connect.sid");

  res.json({ message: "Logged Out" });
});

app.post("/emails", verifyAuth, async (req, res) => {
  const newBody = req.body;
  const senderId = req.user._id;

  try {
    const newEmails = new emailsModel({ sender: senderId, ...newBody });
    await newEmails.save();

    console.log(newEmails);
    res.json({ message: "email sent", emailId: newEmails._id });
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
