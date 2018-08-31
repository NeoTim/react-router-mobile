const { join, resolve } = require('path')
const webpack = require('webpack')
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')

const manifest = require('../dll/vendor-manifest.json')
const { DEV_PORT, DEV_IP } = require('./helper')
const BASE_DIR = join(__dirname, '..')
const index = join(BASE_DIR, 'src', 'index.js')

module.exports = {
  entry: {
    index: [index, 'react-hot-loader/patch', 'webpack-hot-middleware/client'],
  },
  output: {
    path: join(BASE_DIR, 'dist'),
    filename: '[name].[hash].js',
    publicPath: `http://${DEV_IP}:${DEV_PORT}/`,
  },
  mode: 'development',
  devtool: 'cheap-source-map',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules|\/dist\//,
        use: [{ loader: 'babel-loader' }],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: resolve(__dirname, '../dist/index.html'),
      template: resolve(__dirname, '../src/index.html'),
      inject: 'body',
      chunks: ['index'],
      alwaysWriteToDisk: false,
    }),
    new AddAssetHtmlPlugin({
      filepath: resolve(__dirname, '../dll/*.dll.js'),
    }),
    new HtmlWebpackHarddiskPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DllReferencePlugin({
      manifest,
    }),
  ],
}
