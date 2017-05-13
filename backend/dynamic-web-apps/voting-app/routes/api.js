const express = require('express');

const db = require('../src/database');
const User = require('../models/User');

const router = express.Router();

router.post('/finduser', async (req, res) => {
  const result = await db.findUser(User, req.body.username);
  res.json({ userExists: result !== 0 });
});
router.get('/userpolls/:username', async (req, res) => {
  const result = await db.fetchUserPolls(User, req.params.username);
  res.json({ polls: result });
});
router.get('/sessionisvalid', (req, res) => {
  req.isAuthenticated() ? res.status(200).end() : res.status(401).end();
});

module.exports = router;
