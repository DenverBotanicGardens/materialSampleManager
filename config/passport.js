// config/passport.js
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const db = require("../models")
const User = db.user

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await User.findOne({ where: { username: username } });

      if (!user) {
        return done(null, false);
      }

      const isValidPassword = await bcrypt.compare(password, user.password);

      if (!isValidPassword) {
        return done(null, false);
      }
      return done(null, user);
    } catch (err) {
        return done(err);
    }
})
);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findByPk(id);
        done(null, user);
  } catch (err) {
    done(err);
  }
});

passport.logout =(req,res) => {
  req.logout()
  res.redirect('/login')
}

module.exports = passport;
