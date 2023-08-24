const asyncHandler = require("express-async-handler");
const User = require("../Models/UserModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");


//Generate token
const generatedToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
  };

//Get User
const getUser = asyncHandler(async (req, res) => {
  const user = await User.find();
  //   res.status(200).json({ message: "Hello user" });
  res.status(200).json(user);
});

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, phone } = req.body;
  if (!name || !email || !password || !phone) {
    res.status(400);
    throw new Error("Plase fill in all fields");
  }
  if (password.length < 6) {
    res.status(400);
    throw new Error("Password must be more than 6 characters");
  }

  //existing user
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    res.status(400);
    throw new Error("user already exists");
  }

  //hash Password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //Create new user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  const token = generatedToken(user._id);
  //cookieManager
  res.cookie("token", generatedToken(user._id), {
    path: "/",
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 86400),
    sameSite: "none",
    secure: true,
  });

  if (user) {
    const { _id, name, email, password } = user;
    res.status(201).json({
      _id,
      name,
      email,
      password,
      token,
      //   _id: user.id,
      //   name: user.name,
      //   email: user.email,
      //   password: user.password,
      //   token:,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }

  //   res.status(201).json({ message: "Registering user" });
});



module.exports = { getUser, registerUser };
