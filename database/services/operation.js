const OperationDAO = require("../models/dao/operation");

class operationService {
  constructor() {}
  async createOperation(operation) {
    return OperationDAO.createOperation(operation);
  }
  async allOperations(selectedUserId) {
    return OperationDAO.allOperations(selectedUserId);
  }
  async oneOperation(selectedUserId, selectedOperationId) {
    return OperationDAO.oneOperation(selectedUserId, selectedOperationId);
  }
  async updateOperation(operation) {
    return OperationDAO.updateOperation(operation);
  }
  async deleteOperation(selectedOperationId) {
    return OperationDAO.deleteOperation(selectedOperationId);
  }
}
module.exports = new operationService();
