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
  description: {
    type: DataTypes.STRING,
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
    allowNull: true,
  },
  childrensId: {
    type: DataTypes.ARRAY(DataTypes.INTEGER),
    defaultValue: [],
    allowNull: true,
  },
  externalPaidAsset: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  externalPaidAssetUrl: {
    type: DataTypes.STRING,
  },
  icon: {
    type: DataTypes.STRING,
  },
  backgroundImage: {
    type: DataTypes.STRING,
  },
});

module.exports = CommissionElement;
