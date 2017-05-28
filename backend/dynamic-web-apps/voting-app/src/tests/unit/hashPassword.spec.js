const test = require('ava');
const bcrypt = require('bcrypt');
const hashPassword = require('../../hashPassword');

test('hasing a password', async (assert) => {
  const password = 'S&CRET';
  const hash = await hashPassword(password);
  const actual = await bcrypt.compare(password, hash);
  const expected = true;
  assert.is(actual, expected, 'It should hash passwords without error');
});
