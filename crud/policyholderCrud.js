let policyholders = [];

function createPolicyholder(policyholder) {
  policyholders.push(policyholder);
  return policyholder;
}

function getPolicyholderById(id) {
  return policyholders.find(policyholder => policyholder.id === id);
}

function updatePolicyholder(id, updatedPolicyholder) {
  const index = policyholders.findIndex(policyholder => policyholder.id === id);
  if (index !== -1) {
    policyholders[index] = updatedPolicyholder;
  }
  return null;
}

function deletePolicyholder(id) {
  policyholders = policyholders.filter(policyholder => policyholder.id !== id);
  return policyholders.length < initialLength;
}

module.exports = { createPolicyholder, getPolicyholderById, updatePolicyholder, deletePolicyholder };
