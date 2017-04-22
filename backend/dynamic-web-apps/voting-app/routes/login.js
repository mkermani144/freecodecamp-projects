const express = require('express');
const passport = require('passport');

const router = express.Router();

router.post('/', passport.authenticate('local'), (req, res) => {
  req.logIn(req.user, (err) => {
    if (err) {
      res.status(500).end();
    }
    res.status(200).end();
  });
});

module.exports = router;
