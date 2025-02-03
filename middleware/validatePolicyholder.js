const { body, validationResult } = require('express-validator');

const validatePolicyholder = [
  body('id').optional().isString().notEmpty().withMessage('ID must be a non-empty string'),
  body('name').isString().notEmpty().withMessage('Name must be a non-empty string'),
  body('address').isString().notEmpty().withMessage('Address must be a non-empty string'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

module.exports = validatePolicyholder;
