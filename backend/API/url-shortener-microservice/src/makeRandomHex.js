const { randomBytes } = require('crypto');
const makeRandomHex = (blacklist) => {
  while(1) {
    const randomHex = randomBytes(3).toString('hex');
    if (blacklist.includes(randomHex) == false) {
      return randomHex;
    }
  }
}

module.exports = makeRandomHex;
