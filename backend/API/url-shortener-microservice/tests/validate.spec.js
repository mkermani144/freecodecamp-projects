const test = require('tape');
const validate = require('../src/validate');

test('validate for no argument', (assert) => {
  const actual = validate();
  const expected = false;
  assert.equal(actual,
    expected,
    'validate should return false when no argument is given'
  );
  assert.end();
});
test('validate for valid http url', (assert) => {
  const actual = validate('http://google.com');
  const expected = true;
  assert.equal(actual,
    expected,
    'validate should return true when a valid http url is given');
  assert.end();
});
