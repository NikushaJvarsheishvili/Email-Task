import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import session from "express-session";
import MongoStore from "connect-mongo";
import bodyParser from "body-parser";

import statusRouter from "./routers/user/statusRouter.js";
import registerRouter from "./routers/user/registerRouter.js";
import loginRouter from "./routers/user/loginRouter.js";
import logoutRouter from "./routers/user/logoutRouter.js";

import emailsRouter from "./routers/email/emailsRouter.js";
import emailCategoryRouter from "./routers/email/emailCategoryRouter.js";
import emailIdRouter from "./routers/email/emailIdRouter.js";
import emailsPatchRouter from "./routers/email/emailsPatchRouter.js";

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

app.use("/user/status", statusRouter);
app.use("/user/register", registerRouter);
app.use("/user/login", loginRouter);
app.use("/user/logout", logoutRouter);

app.use("/emails", emailsRouter);
app.use("/emails/c/", emailCategoryRouter);
app.use("/emails", emailIdRouter);
app.use("/emails", emailsPatchRouter);

app.listen(3000, async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/emailTask");
    console.log("mongoose connected");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
});
