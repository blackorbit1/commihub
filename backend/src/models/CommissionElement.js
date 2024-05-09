const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const CommissionElement = sequelize.define('CommissionElement', {
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
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  amount: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
  parentsId: {
    type: DataTypes.ARRAY(DataTypes.INTEGER),
    defaultValue: [],
  },
  childrensId: {
    type: DataTypes.ARRAY(DataTypes.INTEGER),
    defaultValue: [],
  },
});

module.exports = CommissionElement;
