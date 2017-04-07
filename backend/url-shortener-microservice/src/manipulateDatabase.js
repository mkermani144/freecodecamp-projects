const add = (URL, originalURL, shortURL) => {
  const tempURL = new URL({originalURL, shortURL});
  tempURL.save((err, permURL) => {
    if(err) {
      console.err(err);
    } else {
      console.log('URL added: ', permURL);
    }
  });
}

module.exports = { add };
