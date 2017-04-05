const { test } = require('tape');
const checkString = require('../stringChecker');
test('stringChecker module functionality on valid dates', (assert) => {
  const actual = checkString('20 March 2017');
  const expected = { unix: 1489955400, natural: 'Mon Mar 20 2017' };
  assert.deepEqual(actual, expected, 'checkString() should return correct date object for valid dates');
  assert.end();
});
test('stringChecker module functionality on valid unix timestamps', (assert) => {
  const actual = checkString('1491289118695');
  const expected = true;
  assert.equal(actual, expected, 'checkString() should return true for valid unix timestamps');
  assert.end();
});
test('stringChecker module functionality on empty strings', (assert) => {
  const actual = checkString('');
  const expected = false;
  assert.equal(actual, expected, 'checkString() should return false for empty strings');
  assert.end();
});
test('stringChecker module functionality on empty object', (assert) => {
  const actual = checkString({});
  const expected = false;
  assert.equal(actual, expected, 'checkString() should return false for empty objects');
  assert.end();
});
test('stringChecker module functionality on arrays', (assert) => {
  const actual = checkString([1, 2, 3]);
  const expected = false;
  assert.equal(actual, expected, 'checkString() should return false for arrays');
  assert.end();
});
