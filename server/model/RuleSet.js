const sortBy = require('lodash/fp/sortBy');
const compose = require('lodash/fp/compose');
const map = require('lodash/fp/map');

const Sequelize = require('sequelize');
const sequelize = require('./database');
const Rule = require('./rules/Rule');
const { Scored } = require('./rules/Score');

const Ruleset = sequelize.define('rules', {
    // attributes
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },

    companyId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },

    name: {
      type: Sequelize.STRING,
    },

    ruleOrder: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },

    ruleSet: {
      type: Sequelize.JSON,
      allowNull: false,
    },

  },

  {
    underscored: true,
    freezeTableName: true,
  });

Ruleset.prototype.getRules = function(){
  return Rule.from(this.get('ruleSet'));
}

Ruleset.getScoredRules = function (rules) {
  if( !rules ) return rules;
  return score(rules);
}

const score = compose(
  map(rs => new Scored(rs.getRules(), rs.get('ruleOrder'))),
  sortBy('ruleOrder')
);

module.exports = Ruleset;
