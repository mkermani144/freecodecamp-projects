const { test } = require('tape');
const manipulateString = require('../src/stringManipulator');
test('stringManipulator module functionality on valid natural dates', (assert) => {
  const actual = manipulateString('20 March 2017');
  const expected = { unix: 1489955400, natural: 'Mon Mar 20 2017' };
  assert.deepEqual(actual, expected, 'manipulateString() should return correct date object for valid natural dates');
  assert.end();
});
test('stringManipulator module functionality on valid unix timestamps', (assert) => {
  const actual = manipulateString('1489955400');
  const expected = { unix: 1489955400, natural: 'Mon Mar 20 2017' };
  assert.deepEqual(actual, expected, 'manipulateString() should return correct date object for valid unix timestamps');
  assert.end();
});
test('stringManipulator module functionality on valid small unix timestamps', (assert) => {
  const actual = manipulateString('1000');
  const expected = { unix: 1000, natural: 'Thu Jan 01 1970' };
  assert.deepEqual(actual, expected, 'manipulateString() should return correct date object for valid small unix timestamps');
  assert.end();
});
test('stringManipulator module functionality on empty strings', (assert) => {
  const actual = manipulateString('');
  const expected = { unix: null, natural: null };
  assert.deepEqual(actual, expected, 'manipulateString() should return false for empty strings');
  assert.end();
});
test('stringManipulator module functionality on empty object', (assert) => {
  const actual = manipulateString({});
  const expected = { unix: null, natural: null };
  assert.deepEqual(actual, expected, 'manipulateString() should return false for empty objects');
  assert.end();
});
test('stringManipulator module functionality on arrays', (assert) => {
  const actual = manipulateString([1, 2, 3]);
  const expected = { unix: null, natural: null };
  assert.deepEqual(actual, expected, 'manipulateString() should return false for arrays');
  assert.end();
});
