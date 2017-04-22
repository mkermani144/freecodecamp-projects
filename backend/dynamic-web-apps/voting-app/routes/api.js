const express = require('express');

const db = require('../src/database');
const User = require('../models/User');

const router = express.Router();

router.post('/finduser', async (req, res) => {
  const result = await db.findUser(User, req.body.username);
  res.json({ userExists: result !== 0 });
});

module.exports = router;
