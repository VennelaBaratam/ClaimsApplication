const express = require('express');
const Policy = require('../models/policy');
const validatePolicy = require('../middleware/validatePolicy');

const router = express.Router();

// ✅ Create a new policy
router.post('/', validatePolicy, async (req, res) => {
  try {
    const policy = new Policy(req.body);
    await policy.save();
    res.status(201).send(policy);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// ✅ Get all policies
router.get('/', async (req, res) => {
  try {
    const policies = await Policy.find();
    res.send(policies);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// ✅ Get a policy by ID
router.get('/:id', async (req, res) => {
  try {
    const policy = await Policy.findOne({ _id: req.params.id });
    if (policy) {
      res.send(policy);
    } else {
      res.status(404).send({ error: 'Policy not found' });
    }
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// ✅ Update a policy by ID
router.put('/:id', validatePolicy, async (req, res) => {
  try {
    const policy = await Policy.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
    if (policy) {
      res.send(policy);
    } else {
      res.status(404).send({ error: 'Policy not found' });
    }
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// ✅ Delete a policy by ID
router.delete('/:id', async (req, res) => {
  try {
    const policy = await Policy.findOneAndDelete({ id: req.params.id });
    if (policy) {
      res.status(204).send();
    } else {
      res.status(404).send({ error: 'Policy not found' });
    }
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

module.exports = router;
