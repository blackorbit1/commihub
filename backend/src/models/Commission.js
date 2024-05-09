const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Commission = sequelize.define('Commission', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  commissionerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id',
    },
  },
  clientId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id',
    },
  },
  elements: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false,
  },
  dateRange: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  contact: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  paymentMethod: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false,
  },
  progress: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

module.exports = Commission;
