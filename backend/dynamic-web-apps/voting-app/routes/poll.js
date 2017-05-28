const express = require('express');

const db = require('../src/database');
const User = require('../models/User');

const router = express.Router();

router.post('/add', async (req, res) => {
  if (req.isAuthenticated()) {
    const result = await db.addPoll(User, req.user.username, req.body.poll);
    res.json({ successful: result === 0 });
  } else {
    res.json({ successful: false });
  }
});
router.delete('/delete', async (req, res) => {
  if (req.isAuthenticated()) {
    const result = await db.removePoll(User, req.user.username, req.body.pollId);
    res.json({ successful: result === 0 });
  } else {
    res.json({ successful: false });
  }
});
router.put('/vote', async (req, res) => {
  let user;
  if (req.user) {
    user = req.user.username;
  } else {
    user = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  }
  const casters = await db.fetchBlacklist(User, 'asdfasdf', req.body.pollId);
  if (casters.indexOf(user) === -1) {
    const result = await db.vote(User, req.body.pollId, req.body.choice, user);
    res.json({ successful: result === 0});
  } else {
    res.json({ successful: false });
  }
});
router.get('/fetchrecent', async (req, res) => {
  const result = await db.fetchRecentPolls(User);
  res.send(result).end();
});
router.put('/addchoice', async(req, res) => {
  if (req.isAuthenticated()) {
    const result = await db.addChoice(User, req.user.username, req.body.pollId, req.body.choices);
    res.json({ successful: result === 0 });
  } else {
    res.json({ successful: false });
  }
});
router.get('/fetchblacklist/:id', async(req, res) => {
  const result = await db.fetchBlacklist(User, 'asdfasdf', req.params.id);
  res.json(result);
});

module.exports = router;
