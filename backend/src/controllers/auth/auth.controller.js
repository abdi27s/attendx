import User from "../../models/User.js";
import generateToken from "../../utils/generateToken.js";
import { loginSchema } from "../../validations/auth.validation.js";

// export const register = async (req, res) => {};
export const login = async (req, res) => {
  const parsedData = loginSchema.safeParse(req.body);
  if (!parsedData.success) {
    return res.status(400).json({
      message: parsedData.error.issues[0].message,
    });
  }
  try {
    const { email, password } = parsedData.data;
    const user = await User.findOne({ email }).select("+password");
    if (!user) return res.status(400).json({ msg: "Invalid Email" });

    const isMatch = await user.comparePassword(password);
    console.log(isMatch);
    if (!isMatch) return res.status(400).json({ msg: "Invalid password" });
    const token = generateToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
    });
    res.json({ msg: "User logged In" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const logout = async (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out" });
};

export const getProfile = async (req, res) => {
  try {
    const user = req.user;
    // const user = await User.findById(req.user).select("-password");
    console.log(user);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
