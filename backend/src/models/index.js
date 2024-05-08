const sequelize = require('../config/database');
const Commission = require('./Commission');
const User = require('./User');

// Relationships
User.hasMany(Commission, { foreignKey: 'userId' });
Commission.belongsTo(User, { foreignKey: 'userId' });

const initializeDatabase = async () => {
  await sequelize.sync({ force: true });
  console.log('Database synchronized');
};

module.exports = {
  Commission,
  User,
  initializeDatabase,
  sequelize,
};
