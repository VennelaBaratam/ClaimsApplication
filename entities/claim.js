class Claim {
    constructor(id, policyId, amount, status) {
      this.id = id;
      this.policyId = policyId;
      this.amount = amount;
      this.status = status;
    }
}
  
module.exports = Claim;
  