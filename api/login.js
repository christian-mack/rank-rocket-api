const express = require("express");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { getUserByUsername, validatePassword } = require("../utils/user");

dotenv.config();

const router = express.Router();
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

const generateAccessToken = (user) => {
  return jwt.sign(user, ACCESS_TOKEN_SECRET, { expiresIn: "18000s" });
};

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  const user = getUserByUsername(username);

  if (!user || !validatePassword(user, password)) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const accessToken = generateAccessToken({ username: user.username });

  res.json({ accessToken });
});

module.exports = router;
