import User from "../model/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";

// define the signup function
export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (
    !username ||
    !email ||
    !password ||
    username == "" ||
    email == "" ||
    password == ""
  ) {
    next(errorHandler(400, "All the fields are required"));
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
    // save the newUser info in database
    await newUser.save();
    res.json("Signup Successfully");
  } catch (err) {
    next(err);
  }
};
