'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Edible = mongoose.model('Edible'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Edible
 */
exports.create = function(req, res) {
  var edible = new Edible(req.body);
  edible.user = req.user;

  edible.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(edible);
    }
  });
};

/**
 * Show the current Edible
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var edible = req.edible ? req.edible.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  edible.isCurrentUserOwner = req.user && edible.user && edible.user._id.toString() === req.user._id.toString() ? true : false;

  res.jsonp(edible);
};

/**
 * Update a Edible
 */
exports.update = function(req, res) {
  var edible = req.edible ;

  edible = _.extend(edible , req.body);

  edible.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(edible);
    }
  });
};

/**
 * Delete an Edible
 */
exports.delete = function(req, res) {
  var edible = req.edible ;

  edible.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(edible);
    }
  });
};

/**
 * List of Edibles
 */
exports.list = function(req, res) { 
  Edible.find().sort('-created').populate('user', 'displayName').exec(function(err, edibles) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(edibles);
    }
  });
};

/**
 * Edible middleware
 */
exports.edibleByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Edible is invalid'
    });
  }

  Edible.findById(id).populate('user', 'displayName').exec(function (err, edible) {
    if (err) {
      return next(err);
    } else if (!edible) {
      return res.status(404).send({
        message: 'No Edible with that identifier has been found'
      });
    }
    req.edible = edible;
    next();
  });
};
