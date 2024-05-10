const sequelize = require('../config/database');
const Commission = require('./Commission');
const User = require('./User');
const CommissionElement = require('./CommissionElement');

// Commissioner (User) has many Commissions
User.hasMany(Commission, { foreignKey: 'commissionerId', as: 'Commissions' });
Commission.belongsTo(User, { foreignKey: 'commissionerId', as: 'Commissioner' });

// Client (User) has many Commissions
User.hasMany(Commission, { foreignKey: 'clientId', as: 'ClientCommissions' });
Commission.belongsTo(User, { foreignKey: 'clientId', as: 'Client' });

// Commission has many CommissionElements
Commission.hasMany(CommissionElement, { foreignKey: 'commissionId', as: 'commissionElements' }); // Changed alias to 'commissionElements'
CommissionElement.belongsTo(Commission, { foreignKey: 'commissionId', as: 'commission' });

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
