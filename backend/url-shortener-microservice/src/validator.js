const validator = (string) => {
  const urlRegex = /^https?:\/\/(www\.)?[a-zA-Z1-9\.]+\.[a-zA-Z]+$/;
  return urlRegex.test(string);
}
module.exports = validator;
