const compose = require('lodash/fp/compose');

const Passport = require('./Passport');

const User = require('./api/User');
// const Rule = require('./Rule');
// const Person = require('./Person');
// const Scoring = require('./Scoring');

module.exports = compose(
  // Scoring,
  // Rule,
  // Person,
  // Company
  Passport,
  User,
);
