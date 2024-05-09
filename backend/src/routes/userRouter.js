const express = require('express');
const { User } = require('../models');
const router = express.Router();

// Update theme preference
router.put('/theme', async (req, res) => {
  const { discordId, theme } = req.body;
  try {
    const user = await User.findOne({ where: { discordId } });
    if (user) {
      user.theme = theme;
      await user.save();
      res.json({ success: true });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update commissioner status
router.put('/commissioner', async (req, res) => {
  const { discordId, commissioner } = req.body;
  try {
    const user = await User.findOne({ where: { discordId } });
    if (user) {
      user.commissioner = commissioner;
      await user.save();
      res.json({ success: true });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all commissioners
router.get('/commissioners', async (req, res) => {
  try {
    const commissioners = await User.findAll({ where: { commissioner: true } });
    res.json(commissioners);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a specific commissioner
router.get('/:commissionerId', async (req, res) => {
  const { commissionerId } = req.params;
  try {
    const commissioner = await User.findByPk(commissionerId);
    if (commissioner) {
      res.json(commissioner);
    } else {
      res.status(404).json({ error: 'Commissioner not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
