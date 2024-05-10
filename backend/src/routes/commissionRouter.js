const express = require('express');
const { Commission, User, CommissionElement } = require('../models');
const router = express.Router();

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

module.exports = router;
