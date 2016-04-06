'use strict';

/**
 * Module dependencies
 */
var ediblesPolicy = require('../policies/edibles.server.policy'),
  edibles = require('../controllers/edibles.server.controller');

module.exports = function(app) {
  // Edibles Routes
  app.route('/api/edibles').all(ediblesPolicy.isAllowed)
    .get(edibles.list)
    .post(edibles.create);

  app.route('/api/edibles/:edibleId').all(ediblesPolicy.isAllowed)
    .get(edibles.read)
    .put(edibles.update)
    .delete(edibles.delete);

  // Finish by binding the Edible middleware
  app.param('edibleId', edibles.edibleByID);
};
