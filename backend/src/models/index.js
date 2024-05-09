const sequelize = require('../config/database');
const Commission = require('./Commission');
const User = require('./User');
const CommissionElement = require('./CommissionElement');

// Relationships
User.hasMany(Commission, { foreignKey: 'userId' });
Commission.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(CommissionElement, { foreignKey: 'commissionerId' });
CommissionElement.belongsTo(User, { foreignKey: 'commissionerId' });

const initializeDatabase = async () => {
  await sequelize.sync({ force: true });
  console.log('Database synchronized');
};

module.exports = {
  Commission,
  CommissionElement,
  User,
  initializeDatabase,
  sequelize,
};
