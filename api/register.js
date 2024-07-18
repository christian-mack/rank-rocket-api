const express = require("express");
const bcrypt = require("bcryptjs");
const { getUserByUsername, addUser } = require("../utils/user");

const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const existingUser = getUserByUsername(username);

  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = {
      username,
      password: hashedPassword,
    };

    addUser(newUser);
    res.status(201).json({ message: "User created" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
