'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Group Schema
 */
var GroupSchema = new Schema({
  name: String,
  userIds: [Schema.Types.ObjectId]
});

mongoose.model('Group', GroupSchema);
