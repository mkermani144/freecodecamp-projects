const test = require('tape');
const User = require('../../../models/User');
const { connect, add, remove } = require('../../database');

test('connection to database', async (assert) => {
  const actual = await connect();
  const expected = 0;
  assert.equal(actual, expected, 'It should connect to the database without errors');
  assert.end();
});

test('adding to database', async (assert) => {
  const actual = await add(User, 'sample', 'secret');
  const expected = 0;
  await remove(User, 'sample');
  assert.equal(actual, expected, 'It should add documents to the database without errors');
  assert.end();
});

test('adding duplicates to database', async (assert) => {
  await add(User, 'sample', 'secret');
  const actual = await add(User, 'sample', 'secret');
  const expected = 2;
  await remove(User, 'sample');
  assert.equal(actual, expected, 'It should not add duplicate documents to the database');
  assert.end();
});
