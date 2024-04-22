import User from "../model/user.model.js";
import bcryptjs from "bcryptjs";

export const signup = async (req, res) => {
  const { username, email, password } = req.body;

  if (
    !username ||
    !email ||
    !password ||
    username == "" ||
    email == "" ||
    password == ""
  ) {
    return res.status(400).json({ message: "All the fields are required" });
  }

  // hassing password using bcryptjs
  const hashPassword = bcryptjs.hashSync(password, 10);

  // create a new user with input data with signup
  const newUser = new User({
    username,
    email,
    password: hashPassword,
  });

  try {
    await newUser.save();
    res.json("Signup Successfully");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
