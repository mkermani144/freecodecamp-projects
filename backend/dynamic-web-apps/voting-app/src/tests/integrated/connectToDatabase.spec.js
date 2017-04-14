const test = require('tape');
const mongoose = require('mongoose');
const connectToDatabase = require('../../connectToDatabase');

test('connection to database', async (assert) => {
  const res = await connectToDatabase(mongoose);
  assert.equal(res, 0, 'It should connect to the database without errors');
  assert.end();
});
