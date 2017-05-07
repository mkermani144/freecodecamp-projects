const express = require('express');

const db = require('../src/database');
const User = require('../models/User');

const router = express.Router();

router.post('/add', async (req, res) => {
  const result = await db.addPoll(User, req.body.username, req.body.poll);
  res.json({ successful: result === 0 });
});

module.exports = router;
