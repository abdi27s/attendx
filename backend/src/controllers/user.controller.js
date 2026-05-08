import User from "../models/User.js";
import {
  createUserSchema,
  updateUserSchema,
} from "../validations/user.validation.js";
export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    if (users.length === 0)
      return res.status(400).json({ msg: "No data found" });
    return res.status(200).json(users);
  } catch (error) {
    console.error("Error in getUsers", error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

export const createUser = async (req, res) => {
  const parsedData = createUserSchema.safeParse(req.body);
  console.log(parsedData);
  if (!parsedData.success) {
    return res.status(400).json({
      message: parsedData.error.issues[0].message,
    });
  }

  const { email, cardno } = parsedData.data;
  const existingUser = await User.findOne({ $or: [{ email }, { cardno }] });
  if (existingUser) {
    return res.status(404).json({
      msg: "User already exists",
    });
  }

  try {
    const user = await User.create(parsedData.data);
    return res.status(201).json({ msg: "user created" });
  } catch (error) {
    console.error("Error in createUser", error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ msg: "User not found" });
    return res.status(200).json(user);
  } catch (error) {
    console.error("Error in getUserById", error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

export const updateUser = async (req, res) => {
  const parsedData = updateUserSchema.safeParse(req.body);
  if (!parsedData.success) {
    return res.status(400).json({
      message: parsedData.error.issues[0].message,
    });
  }
  try {
    const user = await User.findByIdAndUpdate(req.params.id, parsedData.data, {
      returnDocument: "after",
    });
    if (!user) return res.status(404).json({ msg: "User not found" });
    return res.status(200).json(user);
  } catch (error) {
    console.error("Internal Server Error", error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ msg: "User not found" });
    return res.status(200).json({ msg: "User deleted" });
  } catch (error) {
    console.error("Internal Server Error", error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};
