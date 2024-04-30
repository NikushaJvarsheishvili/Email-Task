import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import session from "express-session";
import MongoStore from "connect-mongo";
import bodyParser from "body-parser";
import dotenv from "dotenv";

import statusRouter from "./routers/user/statusRouter.js";
import registerRouter from "./routers/user/registerRouter.js";
import loginRouter from "./routers/user/loginRouter.js";
import logoutRouter from "./routers/user/logoutRouter.js";

import emailsRouter from "./routers/email/emailsRouter.js";
import emailCategoryRouter from "./routers/email/emailCategoryRouter.js";
import emailIdRouter from "./routers/email/emailIdRouter.js";
import emailsPatchRouter from "./routers/email/emailsPatchRouter.js";
import emailDeleteRouter from "./routers/email/emailDeleteRouter.js";

import { handleError } from "./middleware/handleError.js";

const app = express();

dotenv.config({ path: "./config/.env" });

app.use(bodyParser.json());
app.use(express.json());
app.use(
  cors({
    origin: process.env.ALLOWED_ORIGIN,
    credentials: true,
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
    },
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URL,
    }),
  })
);

app.use("/user/status", statusRouter);
app.use("/user/register", registerRouter);
app.use("/user/login", loginRouter);
app.use("/user/logout", logoutRouter);

app.use("/emails", emailsRouter);
app.use("/emails/c/", emailCategoryRouter);
app.use("/emails", emailIdRouter);
app.use("/emails", emailsPatchRouter);
app.use("/email/delete", emailDeleteRouter);

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
