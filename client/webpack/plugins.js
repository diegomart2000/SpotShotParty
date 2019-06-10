const path = require('path');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');

const client = {
  base: [
    new Dotenv({
      systemvars: true
    }),
    new webpack.ProvidePlugin({
      fetch: "imports?this=>global!exports?global.fetch!whatwg-fetch" // fetch API
    }),

    new WorkboxPlugin.GenerateSW({
      // these options encourage the ServiceWorkers to get in there fast
      // and not allow any straggling "old" SWs to hang around
      clientsClaim: true,
      skipWaiting: true
    })
  ],

  dev: [
    new HtmlWebpackPlugin({
      template: "client/src/index.dev.html"
      //filename: "index.html"
    })
  ],

  prod: [
    new HtmlWebpackPlugin({
      template: "client/src/index.prod.html",
      filename: "index.html"
    })
  ]
};

const server = {
  base: [new Dotenv()],
  dev: [],
  prod: []
};

module.exports = {
  client,
  server
}
