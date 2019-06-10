const merge = require('webpack-merge');
const webpack = require('webpack');
const config = require('./client.base');
const plugins = require("./plugins").client.dev;
const path = require('path');

const GLOBALS = {
  'process.env': {
    'NODE_ENV': JSON.stringify('development')
  },
  __DEV__: JSON.stringify(JSON.parse(process.env.DEBUG || 'true')),
};

module.exports = merge(config, {
  mode: "development",
  devtool: "cheap-module-source-map", // To avoid react error handling and cors error

  entry: {
    application: ["js/app", "styles/styles.scss", "react-hot-loader/babel"]
  },

  output: {
    filename: "js/[name]-[hash].js",
    path: path.resolve(__dirname, "../build"),
    publicPath: "/",
    crossOriginLoading: "anonymous"
  },

  devServer: {
    host: "0.0.0.0",
    contentBase: "../build",
    historyApiFallback: true,
    index: "index.html",
    hot: true
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin(GLOBALS),
    ...plugins
  ],

  module: {
    rules: [
      // Sass
      {
        test: /\.scss$/,

        use: [
          "style-loader",
          {
            loader: "css-loader",
            query: {
              modules: true,
              // importLoaders: 2,
              localIdentName: "[path][name]__[local]--[hash:base64:5]"
            }
          },
          {
            loader: "sass-loader",
            query: {
              outputStyle: "expanded"
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: "style-loader!css-loader"
      }
    ]
  }
});
