const express = require('express');
const router = express.Router();
const { Commission, User } = require('../models');

// Get all commissions
router.get('/', async (req, res) => {
  const commissions = await Commission.findAll();
  res.json(commissions);
});

// Create a commission
router.post('/', async (req, res) => {
  const { title, description, userId } = req.body;
  const commission = await Commission.create({ title, description, userId });
  res.status(201).json(commission);
});

// Update a commission
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { progress } = req.body;
  const commission = await Commission.findByPk(id);
  commission.progress = progress;
  await commission.save();
  res.json(commission);
});

// Delete a commission
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await Commission.destroy({ where: { id } });
  res.status(204).send();
});

module.exports = router;
