const mongoose = require('mongoose');

const policySchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  policyholderId: { type: String, required: true },
  coverageAmount: { type: Number, required: true }
});

const Policy = mongoose.model('Policy', policySchema);

module.exports = Policy;
