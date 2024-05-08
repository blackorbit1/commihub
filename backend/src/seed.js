require('dotenv').config();
const mongoose = require('mongoose');
const Commission = require('./models/Commission');
const CommissionElement = require('./models/CommissionElement');

async function seedData() {
  await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

  await Commission.deleteMany({});
  await CommissionElement.deleteMany({});

  // Example of nested nodes
  const node1 = await CommissionElement.create({ name: 'Rexouium', type: 'avatarBase', price: 10 });
  const node2 = await CommissionElement.create({ name: 'Nardo', type: 'avatarBase', price: 10 });
  const textureElement = await CommissionElement.create({
    name: 'Texture',
    type: 'texture',
    children: [node1._id, node2._id],
  });

  const commission = new Commission({
    title: 'Sample VRChat Avatar Commission',
    description: 'A basic example of a VRChat avatar commission.',
    progress: 20,
    elements: [textureElement._id],
  });

  await commission.save();

  console.log('Sample data seeded.');
  await mongoose.disconnect();
}

seedData().catch((err) => console.error(err));
