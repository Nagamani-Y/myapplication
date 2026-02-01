const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const getAuthToken = require('../utils/authTokenGenaration');

router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userExist = await User.findOne({ email }); //Check if user already exists
    if (userExist) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10); // 10 = salt rounds
    let newUser = new User({ //Create and save new user with hashed password
      name,
      email,
      password: hashedPassword,
    });
    newUser = await newUser.save();
    const token = getAuthToken(newUser);
    res.send(token);

  } catch (err) {
    console.error("Error saving user:", err);
    res.status(500).json({ error: err.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });//Check if user exists
    if (!user) {
      return res.status(404).json({ message: "User not found. Please register." });
    }
    const isMatch = await bcrypt.compare(password, user.password); //Compare password using bcrypt
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password." });
    }

    //Success
    const userData = {
      _id: user._id,
      name: user.name,
      email:user.email
    }
    const token = getAuthToken(userData)
    console.log(token);
    res.send(token);

  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: err.message });
  }
});

router.post("/updateUser", async (req, res) => {
  try {
    const { updatedUserData, userId } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send('User not found');
    }

    const existingUser = await User.findOne({ email: updatedUserData.email });
    if (existingUser) {
      return res.status(400).send('Email already exists. Please use a different one.');
    }

    user.name = updatedUserData.name || user.name;
    user.email = updatedUserData.email || user.email;
    if (updatedUserData.password) {
      user.password = await bcrypt.hash(updatedUserData.password, 10);
    }

    await user.save();


    const token = getAuthToken(user);
    res.send(token);

  } catch (error) {
    console.error("Update User Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


module.exports = router;
