import path from 'path';
import fs from 'fs';

import React from 'react';
import express from 'express';
import ReactDOMServer from 'react-dom/server';

import App from '../src/App';

const requestIp = require('request-ip');

const PORT = process.env.PORT || 3001;
const app = express();

app.get('/', (req, res) => {
  const clientIp = requestIp.getClientIp(req);
  const app = ReactDOMServer.renderToString(<App clientIp={clientIp} />);

  const indexFile = path.resolve('./public/index.html');
  fs.readFile(indexFile, 'utf8', (err, data) => {
    if (err) {
      console.error('Something went wrong:', err);
      return res.status(500).send('Oops, better luck next time!');
    }

    return res.send(
      data.replace('<div id="root"></div>', `<div id="root">${app}</div>`)
        .replace('{{clientIp}}',clientIp)
    );
  });
});

app.use(express.static('./server-build'));

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
