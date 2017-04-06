const test = require('tape');
const validator = require('../src/validator');

test('validator for no argument', (assert) => {
  const actual = validator();
  const expected = false;
  assert.equal(actual,
    expected,
    'validator should return false when no argument is given'
  );
  assert.end();
});
test('validator for valid http url', (assert) => {
  const actual = validator('http://google.com');
  const expected = true;
  assert.equal(actual,
    expected,
    'validator should return true when a valid http url is given');
  assert.end();
});
