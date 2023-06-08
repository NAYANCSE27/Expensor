import { Router } from "express";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const router = Router();

router.post("/register", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  // TODO: Validate the data before we make a user
  const userExists = User.findOne({ email });
  if (userExists) {
    res.status(406).json({ message: "User already exists" });
    return;
  }

  // Hash the password
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);
  console.log(hashedPassword);

  const user = await User({
    firstName,
    lastName,
    email,
    password: hashedPassword,
  });
  const savedUser = await user.save();
  console.log(savedUser);
  res.status(201).json({ message: "User created successfully" });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const userExists = User.findOne({ email });
  if (!userExists) {
    res.status(404).json({ message: "User not found" });
    return;
  }

  const matched = await bcrypt.compare(password, userExists.password);
  if (!matched) {
    res.status(401).json({ message: "Incorrect password" });
    return;
  }

  // TODO: Create and assign jwt token
  const payload = {
    _id: userExists._id,
    username: userExists.email,
  };
  // console.log("payload" + payload);
  const token = jwt.sign(payload, "some secret");
  res.status(200).json({ message: "Logged in successfully", token });
});

export default router;
