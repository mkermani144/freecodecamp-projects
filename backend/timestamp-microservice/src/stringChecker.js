const checkString = (string) => {
  if (typeof string == 'string') {
    if (isNaN(Date.parse(string)) == false) {
      return true;
    } else if (isNaN((new Date(parseInt(string))).getHours()) == false) {
      return true;
    }
  }
  return false;
}
module.exports = checkString;
