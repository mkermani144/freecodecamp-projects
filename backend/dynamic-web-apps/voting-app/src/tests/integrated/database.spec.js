const test = require('tape');
const User = require('../../../models/User');
const { connect, add, remove } = require('../../database');

test('connection to database', async (assert) => {
  const res = await connect();
  assert.equal(res, 0, 'It should connect to the database without errors');
  assert.end();
});

test('adding to database', async (assert) => {
  const res = await add(User, 'sample', 'secret');
  // try {
    await remove(User, 'sample');
  // } catch (e) { assert.fail(e); }
  assert.equal(res, 0, 'It should add documents to the database without errors');
  assert.end();
});

test('adding duplicates to database', async (assert) => {
  await add(User, 'sample', 'secret');
  const res = await add(User, 'sample', 'secret');
  // try {
    await remove(User, 'sample');
  // } catch (e) {}
  assert.equal(res, 2, 'It should not add duplicate documents to the database');
  assert.end();
});
