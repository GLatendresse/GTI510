'use strict';

/**
 * Module dependencies
 */
var transactionsPolicy = require('../policies/transactions.server.policy'),
  transactions = require('../controllers/transactions.server.controller');

module.exports = function (app) {
  // Transactions collection routes
  app.route('/api/transactions').all(transactionsPolicy.isAllowed)
    .get(transactions.list)
    .post(transactions.create);

  // Single transaction routes
  app.route('/api/transactions/:transactionId').all(transactionsPolicy.isAllowed)
    .get(transactions.transactionByID)
    .put(transactions.update)
    .delete(transactions.delete);

  // Finish by binding the transaction middleware
  app.param('transactionId', transactions.transactionByID);
};
