const express = require("express");

const router = express.Router();

const { getUser, registerUser } = require("../Controllers/UserController");

router.get("/", getUser);
router.post("/register", registerUser);

module.exports = router;
