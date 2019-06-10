const Sequelize = require('sequelize');
const sequelize = require('./database');

const Person = sequelize.define('persons', {
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

    fullName: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    details: {
      type: Sequelize.JSON,
      allowNull: false,
    }
  },

  {
    underscored: true,
    freezeTableName: true,
  });

Person.prototype.setPairs = function (pairs) {
  this.dataValues.pairs = pairs;
  return this;
}

module.exports = Person;
