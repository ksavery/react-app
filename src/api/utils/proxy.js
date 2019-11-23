/* eslint-disable no-param-reassign */
const proxy = require('http-proxy-middleware');

const onProxyRes = (proxyRes, req) => {
  const reqAuth = req.headers.authorization;

  // Proxy with Authorization
  if (reqAuth) {
    proxyRes.headers.Authorization = reqAuth;
  }
};

const getOptions = url => ({
  target: url,
  changeOrigin: true,
  secure: process.NODE_ENV === 'production', // Production must be secure
  logLevel: process.env.LOG_LEVEL || 'info',
  onProxyRes,
});

const proxyApi = (url, path) => proxy(path, getOptions(url));

export { proxyApi };
