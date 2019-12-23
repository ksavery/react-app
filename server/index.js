const dotenv = require('dotenv-flow').config(); // Insert .evn variables into process
if (dotenv.error) throw dotenv.error;

const express = require('express');
const { resolve } = require('path');

const proxyApis = require('../config/setupProxy');

const logger = require('./logger');
const argv = require('./argv');
const port = require('./port');
const setup = require('./middleware');

const app = express();

// Enable reverse proxy support in Express. This causes the
// the "X-Forwarded-Proto" header field to be trusted so its
// value can be used to determine the protocol. See
// http://expressjs.com/api#app-settings for more details.
app.set('trust proxy', true);

proxyApis(app);

// Redirect to non-www address
app.get('/*', (req, res, next) => {
  if (req.headers.host.match(/^www/) !== null) {
    res.redirect(`https://${req.headers.host.replace(/^www\./, '')}${req.url}`);
  } else {
    next();
  }
});

// In production we need to pass these values in instead of relying on webpack
setup(app, {
  outputPath: resolve(process.cwd(), 'build'),
  publicPath: '/',
});

// get the intended host and port number, use localhost and port 3000 if not provided
const customHost = argv.host || process.env.HOST;
const host = customHost || null; // Let http.Server use its default IPv6/4 host
const prettyHost = customHost || 'localhost';

// Readiness probe for AKS to make sure the pod/app is working properly
app.get('/health', (req, res) => {
  res.send('OK');
});

// Use the gzipped bundle
app.get('*.js', (req, res, next) => {
  req.url = req.url + '.gz'; // eslint-disable-line
  res.set('Content-Encoding', 'gzip');
  next();
});

// eslint-disable-next-line consistent-return
async function startApp(err) {
  if (err) {
    return logger.error(err.message);
  }

  logger.appStarted(port, prettyHost);
}

// Start your app.
app.listen(port, host, async err => {
  startApp(err);
});
