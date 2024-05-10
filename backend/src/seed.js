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
    {
      commissionerId: hexlight.id,
      clientId: sampleUser.id,
      title: 'Sample Commission 1',
      description: 'Description 1',
      progress: 0,
      userId: sampleUser.id,
      deadlineStart: new Date(),
      deadlineEnd: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000),
      deadlineImportance: 3,
      elements: [1, 2, 3, 4],
      dateRange: { start: new Date(), end: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000) },
      contact: { email: 'example@gmail.com', discord: 'example#1234' },
      paymentMethod: 'PayPal',
      price: 30,
    },
    {
      commissionerId: neonix.id,
      clientId: sampleUser.id,
      title: 'Sample Commission 2',
      description: 'Description 2',
      progress: 50,
      userId: sampleUser.id,
      deadlineStart: new Date(),
      deadlineEnd: new Date(new Date().getTime() + 14 * 24 * 60 * 60 * 1000),
      deadlineImportance: 5,
      elements: [5, 6, 7, 8],
      dateRange: { start: new Date(), end: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000) },
      contact: { email: '', discord: '' },
      paymentMethod: 'PayPal',
      price: 30,
    },
  ]);

  // Commission Elements for hexlight
  const commissionElementsItem = await CommissionElement.bulkCreate([
    // Items
    {
      commissionerId: hexlight.id,
      type: 'item',
      name: 'Gogo loco',
      description: 'The most complete vrc system to sit / crouch / lay',
      price: 0,
      amount: 1,
      parentsId: [],
      childrensId: [],
      icon: '',
      backgroundImage: '',
    },
    {
      commissionerId: hexlight.id,
      type: 'item',
      name: 'Quest compatibility',
      description: 'Some features might not be compatible and some textures might not be as sharp',
      price: 10,
      amount: 1,
      parentsId: [],
      childrensId: [],
      icon: '',
      backgroundImage: '',
    },
    {
      commissionerId: hexlight.id,
      type: 'item',
      name: 'Body types',
      description: 'Custom body types with more polygons such as max muscles or female',
      price: 20,
      amount: 1,
      parentsId: [],
      childrensId: [],
    },
    {
      commissionerId: hexlight.id,
      type: 'item',
      name: 'Really fluffy tail',
      description: 'A really fluffy custom tail that I made on blender',
      price: 0,
      amount: 1,
      parentsId: [],
      childrensId: [],
    },
    {
      commissionerId: hexlight.id,
      type: 'item',
      name: 'Brow bones correction',
      description: 'A little model edit to make the brow bones a bit smoother',
      price: 0,
      amount: 1,
      parentsId: [],
      childrensId: [],
    },
    {
      commissionerId: hexlight.id,
      type: 'item',
      name: 'Simple custom made blendshape',
      description: 'I can make a custom blendshape made on blender',
      price: 5,
      amount: 1,
      parentsId: [],
      childrensId: [],
    },
    {
      commissionerId: hexlight.id,
      type: 'item',
      name: 'Face Tracking',
      description: 'Mouth + eyes tracking setup',
      price: 5,
      amount: 1,
      parentsId: [],
      childrensId: [],
      icon: '',
      backgroundImage: '',
    },
    {
      commissionerId: hexlight.id,
      type: 'item',
      name: 'Fingers Tracking',
      description: 'Fingers tracking (with spread) on PCVR with ultraleap',
      price: 5,
      amount: 1,
      parentsId: [],
      childrensId: [],
    },
    {
      commissionerId: hexlight.id,
      type: 'item',
      name: 'NSFW',
      description: 'Toggable thickkkk dick with DPS system. Can put as many penetration points as you want',
      price: 10,
      amount: 1,
      parentsId: [],
      childrensId: [],
    },
    {
      commissionerId: hexlight.id,
      type: 'item',
      name: 'bHaptic Suit',
      description: 'Compatibility with all the suits and accessories from bHaptics',
      price: 5,
      amount: 1,
      parentsId: [],
      childrensId: [],
    },
    {
      commissionerId: hexlight.id,
      type: 'item',
      name: 'Custom preview pose',
      description: 'Can be a static or animated pose',
      price: 0,
      amount: 1,
      parentsId: [],
      childrensId: [],
      icon: '',
      backgroundImage: '',
    },
  ]);

  // Add Parent-Child Elements
  const clothes = await CommissionElement.create({
    commissionerId: hexlight.id,
    type: 'item',
    name: 'Clothes',
    description: 'All the clothes are toggable but might not be compatible with each other',
    price: 5,
    amount: 1,
    parentsId: [],
    childrensId: [],
    externalPaidAsset: false,
    externalPaidAssetUrl: '',
    icon: '',
    backgroundImage: '',
  });

  const accessories = await CommissionElement.create({
    commissionerId: hexlight.id,
    type: 'item',
    name: 'Accessories',
    description: 'All the accessories are toggable',
    price: 0,
    amount: 1,
    parentsId: [],
    childrensId: [],
    externalPaidAsset: false,
    externalPaidAssetUrl: '',
    icon: '',
    backgroundImage: '',
  });

  // Add Child Elements to Categories
  const clothesChildren = await CommissionElement.bulkCreate([
    {
      commissionerId: hexlight.id,
      type: 'item',
      name: 'Cropped hoodie',
      description: 'A cropped hoodie',
      price: 1,
      amount: 1,
      parentsId: [clothes.id],
      childrensId: [],
      externalPaidAsset: false,
      externalPaidAssetUrl: '',
      icon: '',
      backgroundImage: '',
    },
    {
      commissionerId: hexlight.id,
      type: 'item',
      name: 'Big hoodie',
      description: 'A big hoodie',
      price: 1,
      amount: 1,
      parentsId: [clothes.id],
      childrensId: [],
      externalPaidAsset: false,
      externalPaidAssetUrl: '',
      icon: '',
      backgroundImage: '',
    },
    {
      commissionerId: hexlight.id,
      type: 'item',
      name: 'Pants',
      description: 'A pair of pants',
      price: 2,
      amount: 1,
      parentsId: [clothes.id],
      childrensId: [],
      externalPaidAsset: false,
      externalPaidAssetUrl: '',
      icon: '',
      backgroundImage: '',
    },
    {
      commissionerId: hexlight.id,
      type: 'item',
      name: 'Shorts',
      description: 'A pair of shorts',
      price: 2,
      amount: 1,
      parentsId: [clothes.id],
      childrensId: [],
      externalPaidAsset: false,
      externalPaidAssetUrl: '',
      icon: '',
      backgroundImage: '',
    },
  ]);

  const accessoriesChildren = await CommissionElement.bulkCreate([
    {
      commissionerId: hexlight.id,
      type: 'item',
      name: 'Glasses',
      description: 'A pair of glasses',
      price: 1,
      amount: 1,
      parentsId: [accessories.id],
      childrensId: [],
      externalPaidAsset: false,
      externalPaidAssetUrl: '',
      icon: '',
      backgroundImage: '',
    },
    {
      commissionerId: hexlight.id,
      type: 'item',
      name: 'Hat',
      description: 'A hat',
      price: 10,
      amount: 1,
      parentsId: [accessories.id],
      childrensId: [],
      externalPaidAsset: false,
      externalPaidAssetUrl: '',
      icon: '',
      backgroundImage: '',
    },
  ]);

  // Update Parents with Childrens
  await clothes.update({ childrensId: clothesChildren.map((el) => el.id) });
  await accessories.update({ childrensId: accessoriesChildren.map((el) => el.id) });
  
  // get all the elements ID that could fit the Features category
    const featuresElements = commissionElementsItem.filter((el) =>
        el.name.toLowerCase().includes('gogo loco') ||
        el.name.toLowerCase().includes('tracking') ||
        el.name.toLowerCase().includes('pose') ||
        el.name.toLowerCase().includes('bhaptic') ||
        el.name.toLowerCase().includes('compatibility')
    ).map((el) => el.id);
  
    // get all the elements ID that could fit the Modifications category
    const modificationsElements = commissionElementsItem.filter((el) => 
        el.name.toLowerCase().includes('blendshape') ||
        el.name.toLowerCase().includes('fluffy tail') ||
        el.name.toLowerCase().includes('correction') ||
        el.name.toLowerCase().includes('body types')
    ).map((el) => el.id);
    
    // get all the elements ID that could fit the Wearable category
    const wearableElements = [clothes.id, accessories.id]
    
    // get all the elements ID that could fit the Others category
    const othersElements = commissionElementsItem.filter((el) => 
        el.name.toLowerCase().includes('nsfw')
    ).map((el) => el.id);
  
  
  // Create categories
  const commissionElementsCategory = await CommissionElement.bulkCreate([
      // Categories
      {
          commissionerId: hexlight.id,
          type: 'category',
          name: 'Features',
          description: 'All the features are accessible from the avatar menu',
          price: 0,
          amount: 1,
          parentsId: [],
          childrensId: featuresElements,
          icon: '',
          backgroundImage: '',
      },
        {
            commissionerId: hexlight.id,
            type: 'category',
            name: 'Modifications',
            description: 'Blendshapes, textures, shaders, etc',
            price: 0,
            amount: 1,
            parentsId: [],
            childrensId: modificationsElements,
            icon: '',
            backgroundImage: '',
        },
        {
            commissionerId: hexlight.id,
            type: 'category',
            name: 'Wearable',
            description: 'Clothes, accessories, etc',
            price: 0,
            amount: 1,
            parentsId: [],
            childrensId: wearableElements,
            icon: '',
            backgroundImage: '',
        },
        {
            commissionerId: hexlight.id,
            type: 'category',
            name: 'Others',
            description: 'Everything else',
            price: 0,
            amount: 1,
            parentsId: [],
            childrensId: othersElements,
            icon: '',
            backgroundImage: '',
        },
    ]);

    // Get the created categories
    const featuresCategory = commissionElementsCategory.find(category => category.name === 'Features');
    const modificationsCategory = commissionElementsCategory.find(category => category.name === 'Modifications');
    const wearableCategory = commissionElementsCategory.find(category => category.name === 'Wearable');
    const othersCategory = commissionElementsCategory.find(category => category.name === 'Others');

    
    // Set all the appropriate elements the categories CommissionElement as their parent
    for (const id of featuresElements) await CommissionElement.update({ parentsId: [featuresCategory.id] }, { where: { id } });
    for (const id of modificationsElements) await CommissionElement.update({ parentsId: [modificationsCategory.id] }, { where: { id } });
    for (const id of othersElements) await CommissionElement.update({ parentsId: [othersCategory.id] }, { where: { id } });
    // wearableElements category for CommissionElement list and clothes + accessories for CommissionElement list
    const wearableElementsAllIds = [...wearableElements, clothes.id, accessories.id]
    for (const id of wearableElementsAllIds) await CommissionElement.update({ parentsId: [wearableCategory.id] }, { where: { id } });


  console.log('Sample data seeded.');
}

seedData().catch((err) => console.error(err));
