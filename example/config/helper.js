const ip = require('ip').address();

const PORT = 9001;

const helper = {
  DEV_PORT: PORT,
  DEV_IP: ip,
  DEV_HOST: `http://${ip}:${PORT}`,
};

module.exports = helper;
