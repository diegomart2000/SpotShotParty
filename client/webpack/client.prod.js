const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const config = require('./client.base');
const plugins = require("./plugins").client.prod;

const GLOBALS = {
  "process.env": {
    NODE_ENV: JSON.stringify("production"),
  },
  __DEV__: JSON.stringify(JSON.parse(process.env.DEBUG || "false"))
};

module.exports = merge(config, {
  mode: 'production',
  target: 'web',
  cache: true,
  entry: {
    application: 'js/app',
  },

  output: {
    filename: "js/[name]-[hash].js",
    path: path.resolve(__dirname, "../build"),
    publicPath: '/'
  },

  plugins: [
    new CopyWebpackPlugin([
      {
        from: path.join(__dirname, '../src/images'),
        to: 'images'
      }
    ]),
    // Avoid publishing files when compilation fails
    new webpack.DefinePlugin(GLOBALS),

    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),

    new ExtractTextPlugin({
      filename: 'css/[name].[hash].css',
      allChunks: true
    }),

    ...plugins,
  ],


  module: {
    rules: [
      // Sass
      {
        test: /\.scss$/,
        include: [
          path.resolve(__dirname, '../src/js'),
          path.resolve(__dirname, '../src/styles'),
        ],
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              query: {
                modules: true,
                importLoaders: 1,
                localIdentName: '[path][name]__[local]--[hash:base64:5]'
              }
            },
            { 
              loader: 'sass-loader', 
              query: { 
                outputStyle: 'compressed'
              } 
            }
          ]
        })
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader']
        })
      }
    ]
  },
});
