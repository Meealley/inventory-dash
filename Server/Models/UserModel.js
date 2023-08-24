const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your name"],
    },
    email: {
      type: String,
      required: [true, "Please enter your email"],
      unique: true,
      trim: true,
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Please enter a valid email address",
      ],
    },
    password: {
      type: String,
      required: [true, "Please enter a password"],
      minLength: [6, "Password must be at least 6 characters"],
    //   maxLength: [9, "Password must not exceed 23 characters"],
    },
    photo: {
      type: String,
      required: [true, "Please enter your photo"],
      default: "https://i.ibb.co/4pDNDk1/avatar.png",
    },
    phone: {
      type: String,
      default: "+234",
    },
    bio: {
      type: String,
      maxLength: [250, "bio must be at least 250 characters"],
      default: "bio",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
