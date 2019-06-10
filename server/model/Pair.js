const Sequelize = require('sequelize');
const sequelize = require('./database');

const Pair = sequelize.define('pairs', {
  companyId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },

  personAId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false
  },

  personBId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false
  },

  score: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },

  alreadyMet: {
    type: Sequelize.BOOLEAN,
  },

  details: {
    type: Sequelize.JSON,
  }
},

  {
    underscored: true,
    freezeTableName: true,
  });

module.exports = Pair;
