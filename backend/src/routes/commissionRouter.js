const express = require('express');
const { CommissionElement, Commission, User } = require('../models');
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

// Fetch all orders made by a user
router.get('/orders/:clientId', async (req, res) => {
  const { clientId } = req.params;
  try {
    const orders = await Commission.findAll({
      where: {
        clientId,
      },
      include: [{ model: User, as: 'Commissioner', attributes: ['username', 'avatar', 'discordId'] }],
    });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
