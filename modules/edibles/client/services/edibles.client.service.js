//Edibles service used to communicate Edibles REST endpoints
(function () {
  'use strict';

  angular
    .module('edibles')
    .factory('EdiblesService', EdiblesService);

  EdiblesService.$inject = ['$resource'];

  function EdiblesService($resource) {
    return $resource('api/edibles/:edibleId', {
      edibleId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
})();
