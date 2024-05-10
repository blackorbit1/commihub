const express = require('express');
const { Commission, CommissionElement, User } = require('../models');
const multer = require('multer');
const path = require('path');
const router = express.Router();

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const { type } = req.params;
    const folder = type === 'reference' ? 'references' : 'outputs';
    cb(null, path.join(__dirname, '..', 'uploads', folder));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});
const upload = multer({ storage });

// Get commission elements for a specific commissioner
router.get('/elements/:commissionerId', async (req, res) => {
  const { commissionerId } = req.params;
  try {
    const elements = await CommissionElement.findAll({
      where: {
        commissionerId,
      },
    });
    res.json(elements);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new commission order
router.post('/order', async (req, res) => {
  const { commissionerId, clientId, elements, dateRange, contact, paymentMethod, price } = req.body;

  try {
    const newOrder = await Commission.create({
      commissionerId,
      clientId,
      elements,
      dateRange,
      contact,
      paymentMethod,
      progress: 0,
      price,
    });
    res.status(200).json(newOrder);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Fetch orders made by a user
router.get('/orders/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await Commission.findAll({
      where: { clientId: userId },
      include: { model: User, as: 'Commissioner' },
    });
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Error fetching orders' });
  }
});

// Fetch received commissions for a commissioner
router.get('/received/:commissionerId', async (req, res) => {
  try {
    const { commissionerId } = req.params;
    const received = await Commission.findAll({
      where: { commissionerId },
      include: { model: User, as: 'Client' },
    });
    res.json(received);
  } catch (error) {
    console.error('Error fetching received:', error);
    res.status(500).json({ error: 'Error fetching received' });
  }
});

// Fetch commission details by ID
router.get('/details/:commissionId', async (req, res) => {
  try {
    const { commissionId } = req.params;
    const commission = await Commission.findOne({
      where: { id: commissionId },
      include: [
        { model: User, as: 'Commissioner', attributes: ['id', 'username', 'discordId', 'avatar'] },
        { model: CommissionElement, as: 'elements' },
      ],
    });
    if (!commission) return res.status(404).json({ error: 'Commission not found' });
    res.json(commission);
  } catch (error) {
    console.error('Error fetching commission details:', error);
    res.status(500).json({ error: 'Error fetching commission details' });
  }
});

router.get('/order/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Commission.findByPk(id, {
      include: [{ model: User, as: 'Commissioner' }, { model: CommissionElement, as: 'elements' }],
    });
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/update', async (req, res) => {
  const { id, price, dateRange, paymentMethod, contact, validatedElements } = req.body;

  try {
    const updatedOrder = await Commission.update(
      { price, dateRange, paymentMethod, contact, validatedElements },
      { where: { id } },
    );
    res.json(updatedOrder);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/upload/:orderId/:type', upload.array('files'), async (req, res) => {
  const { orderId, type } = req.params;
  const uploadedFiles = req.files.map((file) => ({
    filename: file.filename,
    originalname: file.originalname,
    path: file.path,
  }));

  try {
    const order = await Commission.findByPk(orderId);
    if (type === 'reference') {
      order.referenceFiles = [...order.referenceFiles, ...uploadedFiles];
    } else if (type === 'output') {
      order.outputFiles = [...order.outputFiles, ...uploadedFiles];
    }
    await order.save();
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/download/:filename', (req, res) => {
  const { filename } = req.params;
  const filepath = path.join(__dirname, '..', 'uploads', filename);
  res.download(filepath);
});



module.exports = router;
