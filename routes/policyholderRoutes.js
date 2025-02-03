const express = require('express');
const Policyholder = require('../models/policyholder');
const validatePolicyholder = require('../middleware/validatePolicyholder');

const router = express.Router();

// Create a new policyholder
router.post('/', validatePolicyholder, async (req, res) => {
  try {
    const policyholder = new Policyholder(req.body);
    await policyholder.save();
    res.status(201).send(policyholder);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all policyholders
router.get('/', async (req, res) => {
  try {
    const policyholders = await Policyholder.find();
    res.send(policyholders);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get a policyholder by policyholderId
router.get('/:policyholderId', async (req, res) => {
  try {
    const policyholder = await Policyholder.findOne({ policyholderId: req.params.policyholderId });
    if (policyholder) {
      res.send(policyholder);
    } else {
      res.status(404).send({ error: 'Policyholder not found' });
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

// Update a policyholder by policyholderId
router.put('/:policyholderId', validatePolicyholder, async (req, res) => {
  try {
    const policyholder = await Policyholder.findOneAndUpdate({ policyholderId: req.params.policyholderId }, req.body, { new: true });
    if (policyholder) {
      res.send(policyholder);
    } else {
      res.status(404).send({ error: 'Policyholder not found' });
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete a policyholder by policyholderId
router.delete('/:policyholderId', async (req, res) => {
  try {
    const policyholder = await Policyholder.findOneAndDelete({ id: req.params.policyholderId  });
    if (policyholder) {
      res.status(204).send();
    } else {
      res.status(404).send({ error: 'Policyholder not found' });
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
