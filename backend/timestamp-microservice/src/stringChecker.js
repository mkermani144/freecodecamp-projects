const checkString = (string) => {
  if (isNaN(Date.parse(string)) == false) {
    return true;
  } else if (isNaN((new Date(string)).getHours()) == false) {
    return true;
  }
  return false;
}
module.exports = checkString;
