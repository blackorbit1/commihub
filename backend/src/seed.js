require('dotenv').config();
const { Commission, User, CommissionElement, initializeDatabase } = require('./models');

async function seedData() {
  await initializeDatabase();

  // Sample User
  const sampleUser = await User.create({
    discordId: '123456',
    username: 'SampleUser',
    email: 'sampleuser@example.com',
  });

  // Commissioners
    const hexlight = await User.create({
      discordId: '282257561586106369',
      avatar: 'cf1e875662b2e49ccd08a2d42cf9aed7',
      username: 'hexlight',
      email: 'hexlight@example.com',
      commissioner: true,
    });

    const turris = await User.create({
      discordId: '903858696793239603',
      avatar: '43d487ef174708c5a2b108bc8389994b',
      username: 'Turris',
      email: 'turris@example.com',
      commissioner: true,
    });

    const neonix = await User.create({
      discordId: '278640359574208512',
      avatar: 'cb1222a43618ddccc0cba726e65f649a',
      username: 'n e o n i x',
      email: 'neonix@example.com',
      commissioner: true,
    });

  // Sample Commissions
  await Commission.bulkCreate([
    { title: 'Sample Commission 1', description: 'Description 1', progress: 0, userId: sampleUser.id },
    { title: 'Sample Commission 2', description: 'Description 2', progress: 50, userId: sampleUser.id },
  ]);

  // Commission Elements for hexlight
  const commissionElements = await CommissionElement.bulkCreate([
    {
      commissionerId: hexlight.id,
      type: 'System',
      name: 'Gogo loco',
      description: 'The most complete vrc system to sit / crouch / lay',
      price: 0,
      amount: 1,
      parentsId: [],
      childrensId: [],
    },
    {
      commissionerId: hexlight.id,
      type: 'Compatibility',
      name: 'Quest compatibility',
      description: 'Some features might not be compatible and some textures might not be as sharp',
      price: 10,
      amount: 1,
      parentsId: [],
      childrensId: [],
    },
    {
      commissionerId: hexlight.id,
      type: 'Body',
      name: 'Body types',
      description: 'Custom body types with more polygons such as max muscles or female',
      price: 20,
      amount: 1,
      parentsId: [],
      childrensId: [],
    },
    {
      commissionerId: hexlight.id,
      type: 'Tail',
      name: 'Really fluffy tail',
      description: 'A really fluffy custom tail that I made on blender',
      price: 0,
      amount: 1,
      parentsId: [],
      childrensId: [],
    },
    {
      commissionerId: hexlight.id,
      type: 'Model Edit',
      name: 'Brow bones correction',
      description: 'A little model edit to make the brow bones a bit smoother',
      price: 0,
      amount: 1,
      parentsId: [],
      childrensId: [],
    },
    {
      commissionerId: hexlight.id,
      type: 'Blendshape',
      name: 'Simple custom made blendshape',
      description: 'I can make a custom blendshape made on blender',
      price: 5,
      amount: 1,
      parentsId: [],
      childrensId: [],
    },
    {
      commissionerId: hexlight.id,
      type: 'Tracking',
      name: 'Face Tracking',
      description: 'Mouth + eyes tracking setup',
      price: 5,
      amount: 1,
      parentsId: [],
      childrensId: [],
    },
    {
      commissionerId: hexlight.id,
      type: 'Tracking',
      name: 'Fingers Tracking',
      description: 'Fingers tracking (with spread) on PCVR with ultraleap',
      price: 5,
      amount: 1,
      parentsId: [],
      childrensId: [],
    },
    {
      commissionerId: hexlight.id,
      type: 'NSFW',
      name: 'NSFW',
      description: 'Toggable thickkkk dick with DPS system. Can put as many penetration points as you want',
      price: 10,
      amount: 1,
      parentsId: [],
      childrensId: [],
    },
    {
      commissionerId: hexlight.id,
      type: 'bHaptics',
      name: 'bHaptic Suit',
      description: 'Compatibility with all the suits and accessories from bHaptics',
      price: 5,
      amount: 1,
      parentsId: [],
      childrensId: [],
    },
    {
      commissionerId: hexlight.id,
      type: 'Preview',
      name: 'Custom preview pose',
      description: 'Can be a static or animated pose',
      price: 0,
      amount: 1,
      parentsId: [],
      childrensId: [],
    },
  ]);

  // Add Parent-Child Elements
    const clothes = await CommissionElement.create({
      commissionerId: hexlight.id,
      type: 'Clothes',
      name: 'Clothes',
      description: 'All the clothes are toggable but might not be compatible with each other',
      price: 0,
      amount: 1,
      parentsId: [],
      childrensId: [],
    });

    const accessories = await CommissionElement.create({
      commissionerId: hexlight.id,
      type: 'Accessories',
      name: 'Accessories',
      description: 'All the accessories are toggable',
      price: 0,
      amount: 1,
      parentsId: [],
      childrensId: [],
    });

    const clothesChildren = await CommissionElement.bulkCreate([
      {
        commissionerId: hexlight.id,
        type: 'Clothes',
        name: 'Cropped hoodie',
        description: 'A cropped hoodie',
        price: 1,
        amount: 1,
        parentsId: [clothes.id],
        childrensId: [],
      },
      {
        commissionerId: hexlight.id,
        type: 'Clothes',
        name: 'Big hoodie',
        description: 'A big hoodie',
        price: 1,
        amount: 1,
        parentsId: [clothes.id],
        childrensId: [],
      },
      {
        commissionerId: hexlight.id,
        type: 'Clothes',
        name: 'Pants',
        description: 'A pair of pants',
        price: 2,
        amount: 1,
        parentsId: [clothes.id],
        childrensId: [],
      },
      {
        commissionerId: hexlight.id,
        type: 'Clothes',
        name: 'Shorts',
        description: 'A pair of shorts',
        price: 2,
        amount: 1,
        parentsId: [clothes.id],
        childrensId: [],
      },
    ]);

    const accessoriesChildren = await CommissionElement.bulkCreate([
      {
        commissionerId: hexlight.id,
        type: 'Accessories',
        name: 'Glasses',
        description: 'A pair of glasses',
        price: 1,
        amount: 1,
        parentsId: [accessories.id],
        childrensId: [],
      },
      {
        commissionerId: hexlight.id,
        type: 'Accessories',
        name: 'Hat',
        description: 'A hat',
        price: 10,
        amount: 1,
        parentsId: [accessories.id],
        childrensId: [],
      },
    ]);

    // Update Parents with Childrens
    await clothes.update({ childrensId: clothesChildren.map((el) => el.id) });
    await accessories.update({ childrensId: accessoriesChildren.map((el) => el.id) });

    console.log('Sample data seeded.');
  }

  seedData().catch((err) => console.error(err));
