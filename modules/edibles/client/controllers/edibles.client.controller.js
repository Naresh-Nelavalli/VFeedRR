(function () {
  'use strict';

  // Edibles controller
  angular
    .module('edibles')
    .controller('EdiblesController', EdiblesController);

  EdiblesController.$inject = ['$scope', '$state', 'Authentication', 'edibleResolve'];

  function EdiblesController ($scope, $state, Authentication, edible) {
    var vm = this;

    vm.authentication = Authentication;
    vm.edible = edible;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Edible
    function remove() {
      if (confirm('Are you sure you want to delete?')) {
        vm.edible.$remove($state.go('edibles.list'));
      }
    }

    // Save Edible
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.edibleForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.edible._id) {
        vm.edible.$update(successCallback, errorCallback);
      } else {
        vm.edible.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('edibles.view', {
          edibleId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
})();
