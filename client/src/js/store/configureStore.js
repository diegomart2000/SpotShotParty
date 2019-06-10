if (process.env.NODE_ENV === 'production') {
  module.exports = require('./store.production').default;
}
else {
  module.exports = require('./store.development').default;
}
