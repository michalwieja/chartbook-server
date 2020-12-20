import express from "express";
import User from "../models/UserModel.js";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import verifyToken from "./verifyToken.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  const email = await User.findOne({ email: req.body.email });
  if (email) return res.status(400).json({ msg: "Email already taken" });
  //hash
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });

  try {
    const user = await newUser.save();

    // create and asign a token
    const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET, {
      expiresIn: 3600,
    });
    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post("/login", async (req, res) => {
  // chceck is user exists
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).json({ msg: "wrong email" });
  //hash
  const validUser = await bcrypt.compare(req.body.password, user.password);
  if (!validUser) return res.status(400).json({ msg: "wrong pass" });

  // create and asign a token
  const token = jwt.sign({ id: validUser._id }, process.env.TOKEN_SECRET, {
    expiresIn: 3600,
  });
  res.json({
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
  });
});

router.get("/user", verifyToken, (req, res) => {
  User.findById(req.user.id)
    .select("-password")
    .then((user) => res.json(user));
});

export default router;
