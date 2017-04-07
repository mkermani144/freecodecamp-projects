const { randomBytes } = require('crypto');
const makeRandomHex = () => {
  return randomBytes(3).toString('hex');
}

module.exports = makeRandomHex;
