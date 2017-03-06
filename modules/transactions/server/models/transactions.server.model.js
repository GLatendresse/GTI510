'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Transaction Schema
 */
var TransactionSchema = new Schema({
  amount: Number,
  userId: Schema.Types.ObjectId,
  groupId: Schema.Types.ObjectId
});

mongoose.model('Transaction', TransactionSchema);
