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
    const token = jwt.sign({ id: validUser._id, isAdmin : validUser.isAdmin }, process.env.JWT_SECURET_KEY);

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

// functionality for take the info from the google using farebase

export const google = async (req, res, next)=>{
// extract info from req.body
const {name, email,photoUrl} = req.body;

try {
  // If user is already exist
  const user = await User.findOne({email});
  if(user){
    const token = jwt.sign({id : user._id, isAdmin : user.isAdmin}, process.env.JWT_SECURET_KEY);
    const {password, ...rest} = user._doc;
    res.status(200).cookie('access_token', token,{
      httpOnly : true,
    }).json(rest);
  }else{
    // else  create new exist
    // when we access data from google it does not provide password that's why we need to generate rendom password we can update this password in future 
    const generatePassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);

    // hash this generated password
    const hashedPassword = bcryptjs.hashSync(generatePassword, 10);

    const newUser = new User({
      username : name.toLowerCase().split(' ').join('') + Math.random.toString(9).slice(-4),
      email,
      password : hashedPassword,
      profilePicture: photoUrl

    });

    await newUser.save();
    const token = jwt.sign({id : _id, isAdmin : newUser.isAdmin}, process.env.JWT_SECURET_KEY);
    const {password, ...rest} = newUser._doc;

    res.status(200).cookie('access_token', token,{
      httpOnly:true
    }).json(rest);

  }
  
} catch (error) {
  // we use our middleware here
  next(error)
  
}
}