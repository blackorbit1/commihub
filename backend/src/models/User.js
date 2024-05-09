const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  discordId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
  },
  avatar: {
    type: DataTypes.STRING,
  },
  theme: {
    type: DataTypes.STRING,
    defaultValue: 'dark',
  },
  commissioner: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = User;
