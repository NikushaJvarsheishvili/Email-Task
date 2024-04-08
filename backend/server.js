import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import session from "express-session";
import MongoStore from "connect-mongo";
import bcrypt from "bcrypt";
import { usersModel } from "./usersModel.js";

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

app.get("/user/status", async (req, res) => {
  const user = await usersModel
    .findById(req.session.userId)
    .select("-password");

  if (user) {
    res.json({ user });
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
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
    const loginUser = await usersModel.findOne({ email });

    if (loginUser) {
      const comparePassword = await bcrypt.compare(
        password,
        loginUser.password
      );

      if (loginUser && comparePassword) {
        req.session.userId = loginUser._id.toString();

        return res.json({ user: loginUser });
      }

      return res.json({ message: "Logged in" });
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

app.listen(3000, async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/emailTask");
    console.log("mongoose connected");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
});
