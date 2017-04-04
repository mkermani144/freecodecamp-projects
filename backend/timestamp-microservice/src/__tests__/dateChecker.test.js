const { test } = require('tape');
const checkDate = require('../dateChecker');
test('dateChecker module functionality on valid dates', (assert) => {
  const actual = checkDate('20 March 2017');
  const expected = true;
  assert.equal(actual, expected, 'checkDate() should return true for valid dates');
  assert.end();
});
test('dateChecer module functionality on valid unix timestamps', (assert) => {
  const actual = checkDate(1491289118695);
  const expected = true;
  assert.equal(actual, expected, 'checkDate() should return true for valid unix timestamps');
  assert.end();
});
