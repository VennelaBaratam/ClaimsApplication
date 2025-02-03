let policies = [];

function createPolicy(policy) {
  policies.push(policy);
}

function getPolicyById(id) {
  return policies.find(policy => policy.id === id);
}

function updatePolicy(id, updatedPolicy) {
  const index = policies.findIndex(policy => policy.id === id);
  if (index !== -1) {
    policies[index] = updatedPolicy;
  }
}

function deletePolicy(id) {
  policies = policies.filter(policy => policy.id !== id);
}

module.exports = { createPolicy, getPolicyById, updatePolicy, deletePolicy };
