const test = require('ava');
const User = require('../../../models/User');
const { connect, add, remove, findUser } = require('../../database');

test('connection to database', async (t) => {
  const actual = await connect();
  const expected = 0;
  t.is(actual, expected, 'It should connect to the database without errors');
});

test('adding to database', async (t) => {
  const actual = await add(User, 'sample', 'secret');
  const expected = 0;
  await remove(User, 'sample');
  t.is(actual, expected, 'It should add documents to the database without errors');
});

test('adding duplicates to database', async (t) => {
  await add(User, 'sample', 'secret');
  const actual = await add(User, 'sample', 'secret');
  const expected = 2;
  await remove(User, 'sample');
  t.is(actual, expected, 'It should not add duplicate documents to the database');
});

test('finding usernames in database', async (t) => {
  await add(User, 'sample', 'secret');
  const actual = await findUser(User, 'sample');
  const expected = 1;
  await remove(User, 'sample');
  t.is(actual, expected, 'It should tell if the user exists in the database without errors');
});
