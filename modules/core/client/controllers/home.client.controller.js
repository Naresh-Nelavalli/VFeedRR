(function () {
  'use strict';

<<<<<<< HEAD
angular.module('core').controller('HomeController', ['$scope', 'Authentication',
  function ($scope, Authentication) {
    // This provides Authentication context.
    $scope.authentication = Authentication;
    $scope.alerts=[
      {
        icon:'glyphicon-user',
        colour:'btn-success',
        total:'23,699',
        description:'TOTAL ENROLMENTS'
      },
      {
        icon:'glyphicon-cutlery',
        colour:'btn-primary',
        total:'3,699',
        description:'TOTAL STORES SUBSCRIBED'
      },
      {
        icon:'glyphicon-globe',
        colour:'btn-success',
        total:'36',
        description:'NATIONS SERVING'
      },
      {
        icon:'glyphicon-user',
        colour:'btn-info',
        total:'369',
        description:'TOTAL ENROLLMENTS IN A DAY'
      },
      {
        icon:'glyphicon-inbox',
        colour:'btn-warning',
        total:'9999',
        description:'TONS OF FOOD SAVED'
      },
      {
        icon:'glyphicon-eye-open',
        colour:'btn-danger',
        total:'3,699',
        description:'FOOD SAVINGS IN DAY'
      }
    ];
=======
  angular
    .module('core')
    .controller('HomeController', HomeController);

  function HomeController() {
    var vm = this;
>>>>>>> refs/remotes/origin/master
  }
}());
