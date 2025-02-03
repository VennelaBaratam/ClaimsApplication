const mongoose = require('mongoose');

const claimSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  policyId: { type: String, required: true },
  amount: { type: Number, required: true },
  status: { type: String, required: true }
});

const Claim = mongoose.model('Claim', claimSchema);

module.exports = Claim;

