const path = require('path');

module.exports =  {
  extensions: ['.js', '.jsx', '.json', '.scss'],
  modules: [
    path.join(__dirname, '../src'),
    'node_modules'
  ],
  alias: {
    "styles": path.join(__dirname, '../src/styles'),
    "images": path.join(__dirname, '../src/images'),
    "components": path.join(__dirname, '../src/js/components'),
    "store": path.join(__dirname, '../src/js/store'),
    "request": path.join(__dirname, '../src/js/request'),
    "utils": path.join(__dirname, '../src/js/utils'),
    "ui": path.join(__dirname, '../src/js/components/ui'),
  }
};
