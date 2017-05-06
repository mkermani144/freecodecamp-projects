const express = require('express');
const passport = require('passport');

const router = express.Router();

router.post('/', (req, res) => {
  req.logout();
  res.status(200).end();
});

module.exports = router;
