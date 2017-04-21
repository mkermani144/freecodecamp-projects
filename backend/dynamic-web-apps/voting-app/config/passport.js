const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');
const User = require('../models/User');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    return done(null, user);
  } catch (e) {
    return done(e, false);
  }
});

passport.use(new LocalStrategy(
  async (username, password, done) => {
    try {
      const user = await User.findOne({ username });
      if (!user) {
        return done(null, false, 'Invalid username');
      }
      if (!(await user.correctPassword(password))) {
        return done(null, false, 'Incorrect password');
      }
      return done(null, user);
    } catch (e) {
      return done(e);
    }
  }
))
