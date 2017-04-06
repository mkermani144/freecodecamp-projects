const express = require('express');

const app = express();

app.get('/', (req, res) => {
  const ip = req.ip;
  const acceptLanguage = req.get('Accept-Language');
  const userAgent = req.get('User-Agent');
  res.send({
    'IP address': ip.substring(ip.lastIndexOf(':') + 1, ip.length),
    language: acceptLanguage.split(',')[0],
    OS: userAgent.substring(userAgent.indexOf('(') + 1, userAgent.indexOf(')')),
  });
});

app.listen(process.env.PORT || 8000, () => console.log('App is running on http://localhost:8000'));
