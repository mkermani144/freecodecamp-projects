const express = require('express');

const db = require('../src/database');
const User = require('../models/User');

const router = express.Router();

router.post('/add', async (req, res) => {
  if (req.isAuthenticated()) {
    const result = await db.addPoll(User, req.user, req.body.poll);
    res.json({ successful: result === 0 });
  } else {
    res.json({ successful: false });
  }
});

module.exports = router;