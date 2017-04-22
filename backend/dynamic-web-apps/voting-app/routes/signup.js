const express = require('express');
const passport = require('passport');

const User = require('../models/User');
const db = require('../src/database');

const router = express.Router();

router.post('/', async (req, res) => {
  const result = await db.add(User, req.body.username, req.body.password);
  if (result === 0) {
    passport.authenticate('local', (err, user, info) => {
      if (err) {
        return res.status(500).end();
      }
      req.logIn(user, (err) => {
        if (err) {
          return res.status(500).end();
        }
        res.status(200).end();
      });
    })(req, res);
  } else {
    res.status(500).end();
  }
});

module.exports = router;
