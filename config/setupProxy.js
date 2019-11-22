/* eslint-disable */ /* Remove when you proxy */

const proxy = require('http-proxy-middleware');

// This only effects the development environment. Nginix handles proxying on production
module.exports = function(app) {
  // Proxy goes here
  // Example: app.use('/api', proxy({ target: www.site.com, changeOrigin: ture }))
};
