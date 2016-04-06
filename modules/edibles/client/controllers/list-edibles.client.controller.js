(function () {
  'use strict';

  angular
    .module('edibles')
    .controller('EdiblesListController', EdiblesListController);

  EdiblesListController.$inject = ['EdiblesService'];

  function EdiblesListController(EdiblesService) {
    var vm = this;

    vm.edibles = EdiblesService.query();
  }
})();
