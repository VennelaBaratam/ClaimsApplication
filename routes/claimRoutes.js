const express = require('express');
const Claim = require('../models/claim');
const validateClaim = require('../middleware/validateClaim');

const router = express.Router();

// ✅ Create a new claim
router.post('/', validateClaim, async (req, res) => {
  try {
    const claim = new Claim(req.body);
    await claim.save();
    res.status(201).json(claim);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ✅ Get a claim by ID
router.get('/', async (req, res) => {
  try {
    const claim = await Claim.find();

    
    if (claim) {
      res.json(claim);
    } else {
      res.status(404).json({ error: 'Claim not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ✅ Update a claim by ID
router.put('/claims/:id', validateClaim, async (req, res) => {
  try {
    const claim = await Claim.findOneAndUpdate(
      { id: req.params.id }, // Ensure this ID field matches your database schema
      req.body,
      { new: true } // Return the updated document
    );

    console.log(claim); // Debugging log

    if (claim) {
      res.json(claim);
    } else {
      res.status(404).json({ error: 'Claim not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ✅ Delete a claim by ID
router.delete('/:id', async (req, res) => {
  try {
    const claim = await Claim.findOneAndDelete({ id:req.params.id});
    if (claim) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Claim not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
