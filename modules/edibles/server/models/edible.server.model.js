'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Edible Schema
 */
var EdibleSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill Edible name',
    trim: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Edible', EdibleSchema);
