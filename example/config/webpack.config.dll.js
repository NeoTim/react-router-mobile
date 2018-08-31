const webpack = require('webpack');
const { join } = require('path');

const { dependencies = {}, peerDependencies = {} } = require('../../package.json');

const BASE_DIR = join(__dirname, '..');

const { keys } = Object;

const vendor = [
  ...keys(dependencies),
  ...keys(peerDependencies),
];

module.exports = {
  entry: {
    vendor: vendor,
  },
  output: {
    path: join(BASE_DIR, 'dll'),
    filename: '[name].[hash].dll.js',
    library: '[name]',
  },
  mode: 'production',
  devtool: 'source-map',
  plugins: [
    new webpack.DllPlugin({
      path: join(BASE_DIR, 'dll', '[name]-manifest.json'),
      name: '[name]',
    }),
  ],
};
