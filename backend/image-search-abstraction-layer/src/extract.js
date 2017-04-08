const extract = (rawData) => {
  const imagesData = [];
  rawData.forEach((el) => {
    imagesData.push({ imageURL: el.url, pageURL: el.parentPage });
  });
  return imagesData;
};

module.exports = extract;
