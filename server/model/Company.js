const Sequelize = require('sequelize');
const sequelize = require('./database');

const Company = sequelize.define('companies', {
    // attributes
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },

    name: {
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

module.exports = Company;