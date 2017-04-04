const checkDate = (dateString) => {
  if (isNaN(Date.parse(dateString))) {
    return false;
  }
  return true;
}
module.exports = checkDate;
