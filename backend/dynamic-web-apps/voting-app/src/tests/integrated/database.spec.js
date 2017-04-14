const test = require('tape');
const User = require('../../../models/User');
const { connect, add } = require('../../database');

test('connection to database', async (assert) => {
  const res = await connect();
  assert.equal(res, 0, 'It should connect to the database without errors');
  assert.end();
});

test('adding to database', async (assert) => {
  const res = await add(User, 'sample', 'secret');
  assert.equal(res, 0, 'It should add documents to the database without errors');
  assert.end();
});
