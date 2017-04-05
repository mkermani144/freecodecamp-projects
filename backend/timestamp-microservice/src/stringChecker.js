const checkString = (string) => {
  if (typeof string == 'string') {
    if (isNaN(Date.parse(string)) == false) {
      const unix = Date.parse(string) / 1000;
      const natural = (new Date(string)).toDateString();
      return { unix, natural };
    } else if (isNaN((new Date(parseInt(string))).getHours()) == false) {
      return true;
    }
  }
  return false;
}
module.exports = checkString;
