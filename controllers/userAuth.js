const bcrypt = require('bcryptjs');
const db = require('../models');
const User = db.user

const authController = {
  login: (req, res) => {
    console.log("here")
  },
  register: async (req, res) => {
    try {
      const { username, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      await User.create({ username, password: hashedPassword });
      res.redirect('/login');
    } catch (error) {
      // Handle registration errors
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
