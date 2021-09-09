const OperationDAO = require("../models/dao/operation");

class operationService {
  constructor() {}
  async createOperation(operation) {
    return await OperationDAO.createOperation(operation);
  }
  async allOperations(selectedUserId) {
    return await OperationDAO.allOperations(selectedUserId);
  }
  async balanceOperations(selectedUserId){
    return await OperationDAO.balanceOperations(selectedUserId);
  }
  async oneOperation(selectedUserId, selectedOperationId) {
    return await OperationDAO.oneOperation(selectedUserId, selectedOperationId);
  }
  async updateOperation(operation) {
    return await OperationDAO.updateOperation(operation);
  }
  async deleteOperation(selectedOperationId) {
    return await OperationDAO.deleteOperation(selectedOperationId);
  }
}
module.exports = new operationService();
