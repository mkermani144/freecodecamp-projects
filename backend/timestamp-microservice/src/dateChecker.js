const checkDate = (dateString) => {
  if (isNaN(Date.parse(dateString)) == false) {
    return true;
  } else if (isNaN((new Date(dateString)).getHours()) == false) {
    return true;
  }
  return false;
}
module.exports = checkDate;
