const { body, validationResult } = require('express-validator');
const Policy = require('../models/policy');

const validateClaim = [
  body('policyId').isString().withMessage('Policy ID must be a string'),
  body('amount').isFloat({ gt: 0 }).withMessage('Amount must be a positive number'),
  body('status').isString().withMessage('Status must be a string'),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const policy = await Policy.findOne({ id: req.body.policyId });
    if (!policy) {
      return res.status(400).json({ errors: [{ msg: 'Policy not found' }] });
    }

    if (req.body.amount > policy.coverageAmount) {
      return res.status(400).json({ errors: [{ msg: 'Claim amount cannot exceed policy coverage amount' }] });
    }

    next();
  }
];

module.exports = validateClaim;
