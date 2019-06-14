const compose = require('lodash/fp/compose');

const Passport = require('./Passport');

const User = require('./api/User');
const Party = require('./api/Party');

module.exports = compose(
  Passport,
  User,
  Party,
);
