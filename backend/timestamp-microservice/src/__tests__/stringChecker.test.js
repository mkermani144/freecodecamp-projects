const { test } = require('tape');
const checkString = require('../stringChecker');
test('stringChecker module functionality on valid dates', (assert) => {
  const actual = checkString('20 March 2017');
  const expected = true;
  assert.equal(actual, expected, 'checkString() should return true for valid dates');
  assert.end();
});
test('stringChecker module functionality on valid unix timestamps', (assert) => {
  const actual = checkString(1491289118695);
  const expected = true;
  assert.equal(actual, expected, 'checkString() should return true for valid unix timestamps');
  assert.end();
});
