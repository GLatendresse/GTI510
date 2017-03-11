'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Transaction = mongoose.model('Transaction'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create a transaction
 */
exports.create = function (req, res) {
  var transaction = new Transaction(req.body);

  transaction.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(transaction);
    }
  });
};

/**
 * Update a transaction
 */
exports.update = function (req, res) {
  var transaction = req.transaction;

  transaction.amount = req.body.amount;
  transaction.name = req.body.name;
  transaction.userId = req.body.userId;
  transaction.refundedUserId = req.body.refundedUserId;
  transaction.groupId = req.body.groupId;

  transaction.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(transaction);
    }
  });
};

/**
 * Delete a transaction
 */
exports.delete = function (req, res) {
  var transaction = req.transaction;

  transaction.remove(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(transaction);
    }
  });
};

/**
 * List of Transactions
 */
exports.list = function (req, res) {
  Transaction.find().sort('-created').populate('user', 'displayName').exec(function (err, transactions) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(transactions);
    }
  });
};

/**
 * Transaction middleware
 */
exports.transactionByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Transaction is invalid'
    });
  }

  Transaction.findById(id).populate('user', 'displayName').exec(function (err, transaction) {
    if (err) {
      return next(err);
    } else if (!transaction) {
      return res.status(404).send({
        message: 'No transaction with that identifier has been found'
      });
    }
    req.transaction = transaction;
    next();
  });
};
