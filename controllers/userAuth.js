const bcrypt = require('bcryptjs');
const db = require('../models');
const User = db.user

const authController = {
  login: (req, res) => {
  },
  register: async (req, res) => {
    try {
      const { username, password } = req.body;

      if (!username || !username.trim() || !password) {
        return res.status(400).json({ message: "Username and password are required" });
      }

      if (password.length < 8) {
        return res.status(400).json({ message: "Password must be at least 8 characters" });
      }

      const existingUser = await User.findOne({ where: { username: username.trim() } });
      if (existingUser) {
        return res.status(409).json({ message: "That username is already taken" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      await User.create({ username: username.trim(), password: hashedPassword });

      res.status(201).json({ message: "User created successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Could not create user" });
    }
  },
  dashboard: (req, res) => {
    if (req.isAuthenticated()) {
        res.redirect('/');
    } else {
      res.redirect('/login');
    }
  },
};

module.exports = authController;