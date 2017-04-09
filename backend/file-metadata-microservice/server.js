const express = require('express');
const path = require('path');
const multer = require('multer');

const app = express();
const upload = multer({ storage: multer.memoryStorage() });

app.get('/', (req, res) => {
  res.sendFile(path.resolve('public/index.html'));
});
app.post('/api/filesize', upload.single('file'), (req, res) => {
  res.send({ size: `${req.file.size} bytes` });
});

app.listen(process.env.PORT || 8000, () => {
  console.log(`App is running on http://localhost:${process.env.PORT || 8000}`);
});
