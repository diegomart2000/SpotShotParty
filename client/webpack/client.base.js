require("babel-polyfill");
const path = require('path');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');

const resolve = require('./resolvers');
const plugins = require('./plugins').client.base;

module.exports = {
  target: "web",

  optimization: {
    splitChunks: {
      chunks: "all",
      minSize: 30000,
      maxSize: 5200000
    },
  },

  resolve,
  plugins,

  module: {
    rules: [
      // JavaScript / ES6
      {
        test: /\.jsx?$/,
        use: {
          loader: 'babel-loader'
        }
      },
      // Images
      // Inline base64 URLs for <=8k images, direct URLs for the rest
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        loader: "url-loader",
        query: {
          limit: 8192,
          name: "images/[name].[ext]?[hash]"
        }
      },
      // Fonts
      {
        test: /\.(woff|woff2|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        loader: "file-loader",
        query: {
          name: "fonts/[name].[ext]?[hash]"
        }
      },
      // Sounds
      {
        test: /\.(mp3|wav)?$/,
        loader: "file-loader",
        query: {
          name: "sounds/[name].[ext]?[hash]"
        }
      },
    ]
  }
};
