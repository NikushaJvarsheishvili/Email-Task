import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import session from "express-session";
import MongoStore from "connect-mongo";
import bodyParser from "body-parser";
import dotenv from "dotenv";

import { userRouter } from "./routers/userRouter.js";
import { emailRouter } from "./routers/emailRouter.js";

import { handleError } from "./middleware/handleError.js";

const app = express();

dotenv.config({ path: "./config/.env" });

app.use(bodyParser.json());
app.use(express.json());
app.use(
  cors({
    origin: process.env.ALLOWED_ORIGIN,
    credentials: true,
    exposedHeaders: ["x-csrf-token"],
  })
);
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 2,
      httpOnly: true,
      sameSite: "strict",
    },
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URL,
    }),
  })
);

app.use("/user", userRouter);
app.use("/emails", emailRouter);

app.use(handleError);

app.listen(process.env.EXPRESS_PORT, async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("mongoose connected");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
});
