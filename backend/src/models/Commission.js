const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Commission = sequelize.define('Commission', {
  commissionerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  clientId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  elements: {
    type: DataTypes.ARRAY(DataTypes.INTEGER),
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
    type: DataTypes.STRING,
    allowNull: false,
  },
  progress: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
}, {
  timestamps: true,
});

module.exports = Commission;
