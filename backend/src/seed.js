require('dotenv').config();
const { Commission, User, initializeDatabase } = require('./models');

async function seedData() {
  await initializeDatabase();

  const user = await User.create({
    discordId: '123456',
    username: 'SampleUser',
    email: 'sampleuser@example.com',
  });

  await Commission.bulkCreate([
    { title: 'Sample Commission 1', description: 'Description 1', progress: 0, userId: user.id },
    { title: 'Sample Commission 2', description: 'Description 2', progress: 50, userId: user.id },
  ]);

  console.log('Sample data seeded.');
}

seedData().catch((err) => console.error(err));
