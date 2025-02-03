let claims = [];

function createClaim(claim) {
  claims.push(claim);
  return claim;
}

function getClaimById(id) {
  return claims.find(claim => claim.id === id);
}

function updateClaim(id, updatedClaim) {
  const index = claims.findIndex(claim => claim.id === id);
  if (index !== -1) {
    claims[index] = updatedClaim;
  }
}

function deleteClaim(id) {
  claims = claims.filter(claim => claim.id !== id);
}

module.exports = { createClaim, getClaimById, updateClaim, deleteClaim };
