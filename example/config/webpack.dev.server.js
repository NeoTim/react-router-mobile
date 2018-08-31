const path = require('path');
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const { DEV_PORT } = require('./helper');
const webpackConfig = require('./webpack.config.dev');
const staticPath = path.join(__dirname, '..', 'dist');

const app = express();
const compiler = webpack(webpackConfig);

const wdm = webpackDevMiddleware(compiler, {
  hot: true,
  headers: { 'Access-Control-Allow-Origin': '*' },
});

const whm = webpackHotMiddleware(compiler);

app.use(wdm);
app.use(whm);
app.use('/', express.static(staticPath));

app.listen(DEV_PORT, () => {
  console.log(`Listening on port ${DEV_PORT}!`);
});
