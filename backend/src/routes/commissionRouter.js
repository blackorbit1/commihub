const express = require('express');
const { CommissionElement } = require('../models');
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

module.exports = router;
