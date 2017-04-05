const manipulateString = (string) => {
  if (typeof string == 'string') {
    if (isNaN(Date.parse(string)) == false) {
      const unix = Date.parse(string) / 1000;
      const natural = (new Date(string)).toDateString();
      return { unix, natural };
    } else if (isNaN((new Date(1000 * parseInt(string))).getHours()) == false) {
      const unix = parseInt(string);
      const natural = (new Date(unix * 1000)).toDateString();
      return { unix, natural };
    }
  }
  return false;
}
module.exports = manipulateString;
