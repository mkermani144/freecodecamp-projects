const test = require('tape');
const validator = require('../src/validator');

test('validator for no argument', (assert) => {
  const actual = validator();
  const expected = 'Error: Not a valid URL';
  assert.equal(actual,
    expected,
    'validator should return error when no argument is given'
  );
  assert.end();
});
