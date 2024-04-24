import User from "../model/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

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

// signIn page creation and add functinality

export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password || email === "" || password === "") {
    next(errorHandler(400, "All Fields Are Required"));
  }

  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(400, "User is not found"));
    }

    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(400, "Invalid Password"));
    }

    // create token using jwt
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECURET_KEY);

    // for seprate the password from user entered details we use 
    const {password : pass, ...rest} = validUser._doc;

    // store the cookie with access_token name 
    res.status(200).cookie("access_token", token,{
      httpOnly : true
    }).json(rest)


  } catch (error) {
    next(error);
  }
};
