const express = require("express");

const router = express.Router();

const {
  getUser,
  registerUser,
  loginUser,
  logoutUser,
  getMe,
} = require("../Controllers/UserController");

router.get("/", getUser);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);
router.get("/me", getMe);

module.exports = router;
