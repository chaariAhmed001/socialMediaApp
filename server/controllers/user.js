import UserModel from "../models/UserModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (!user) return res.status(404).json({ message: "User doesn't exist" });
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.status(400).json({ message: "Invalid password or email" });
    const token = jwt.sign({ email: user.email, id: user._id }, 'shhhh', {
      expiresIn: "1h",
    });
    console.log(token);
    res.status(200).json({ data: {user, token} });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const signup = async (req, res) => {
  const { firstName, lastName, email, password, confirmPassword } = req.body;
  try {
    const userExist = await UserModel.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: "User already exists" });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = new UserModel({
      name: `${firstName} ${lastName}`,
      email: email,
      password: hashedPassword,
    });
    await user.save();
    const token = jwt.sign({ email: user.email, id: user._id }, 'shhhh', {
      expiresIn: "1h",
    });
    console.log(token);

    res.status(201).json({ data: {user, token} });
  } catch (error) {
    res.json({ message: error });
  }
};
