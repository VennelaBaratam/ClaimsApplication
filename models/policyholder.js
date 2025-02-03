const mongoose = require('mongoose');

const policyholderSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  address: { type: String, required: true }
});

const Policyholder = mongoose.model('Policyholder', policyholderSchema);

module.exports = Policyholder;
