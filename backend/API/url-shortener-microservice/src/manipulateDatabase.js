const add = (URL, originalURL, shortURL) => {
  const tempURL = new URL({originalURL, shortURL});
  tempURL.save((err, permURL) => {
    if(err) {
      console.err(err);
    } else {
      console.log('URL added: ', permURL);
    }
  });
};

const fetchShortURLs = (URL, callback) => {
  URL.find({}, (err, data) => {
    if (err) {
      console.err(err);
    } else {
      callback(data.map((el) => el.shortURL));
    }
  });
};

const findOriginalURL = (URL, shortURL, callback) => {
  URL.find({ shortURL }, (err, data) => {
    if (err) {
      console.err(err);
    } else {
      callback(data);
    }
  })
}

module.exports = { add, fetchShortURLs, findOriginalURL };
