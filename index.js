import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import postRouter from "./Router/postRouter.js";
import authRouter from "./Router/authRouter.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/posts", postRouter);
app.use("/auth", authRouter);

const PORT = process.env.PORT || 5000;

mongoose.connect(
  process.env.MONGO_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    app.listen(PORT, () => console.log(`server at ${PORT}`));
  }
);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
