import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import session from "express-session";
import MongoStore from "connect-mongo";
import bcrypt from "bcrypt";
import bodyParser from "body-parser";

import { usersModel } from "./models/usersModel.js";
import { verifyAuth } from "./middleware/verifyAuth.js";
import { emailsModel } from "./models/emailsModel.js";

const app = express();

app.use(bodyParser.json());
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
    const newEmails = new emailsModel({ ...newBody, sender: senderId });
    await newEmails.save();

    console.log(newEmails);
    res.json({ message: "email sent", email: newEmails });
  } catch (error) {
    console.log(error.message);
  }
});

app.get("/emails/c/:emailCategory", verifyAuth, async (req, res) => {
  const { emailCategory } = req.params;
  const user = req.user;

  try {
    if (emailCategory === "inbox") {
      const inboxEmails = await emailsModel
        .find({ recipients: user.email })
        .populate({
          path: "sender",
          select: "-password",
        });
      res.json({ emails: inboxEmails });
    } else if (emailCategory === "sent") {
      const sentEmail = await emailsModel.find({ sender: user._id });
      res.json({ emails: sentEmail });
    } else if (emailCategory === "archived") {
      const archivedEmail = await emailsModel.find({ archived: true });
      // res.json({ emails: archivedEmail });
      // res.json({ emails: [] });
    }
  } catch (error) {
    console.log(error.message);
  }
});

app.get("/emails/:emailId", async (req, res) => {
  const { emailId } = req.params;

  try {
    const emailFindById = await emailsModel
      .findById(emailId)
      .populate({ path: "sender", select: "-password" });

    res.json({ email: emailFindById });
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
