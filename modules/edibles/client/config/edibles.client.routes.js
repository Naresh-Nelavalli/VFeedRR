(function () {
  'use strict';

  angular
    .module('edibles')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('edibles', {
        abstract: true,
        url: '/edibles',
        template: '<ui-view/>'
      })
      .state('edibles.list', {
        url: '',
        templateUrl: 'modules/edibles/client/views/list-edibles.client.view.html',
        controller: 'EdiblesListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Edibles List'
        }
      })
      .state('edibles.create', {
        url: '/create',
        templateUrl: 'modules/edibles/client/views/form-edible.client.view.html',
        controller: 'EdiblesController',
        controllerAs: 'vm',
        resolve: {
          edibleResolve: newEdible
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle : 'Edibles Create'
        }
      })
      .state('edibles.edit', {
        url: '/:edibleId/edit',
        templateUrl: 'modules/edibles/client/views/form-edible.client.view.html',
        controller: 'EdiblesController',
        controllerAs: 'vm',
        resolve: {
          edibleResolve: getEdible
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Edible {{ edibleResolve.name }}'
        }
      })
      .state('edibles.view', {
        url: '/:edibleId',
        templateUrl: 'modules/edibles/client/views/view-edible.client.view.html',
        controller: 'EdiblesController',
        controllerAs: 'vm',
        resolve: {
          edibleResolve: getEdible
        },
        data:{
          pageTitle: 'Edible {{ articleResolve.name }}'
        }
      });
  }

  getEdible.$inject = ['$stateParams', 'EdiblesService'];

  function getEdible($stateParams, EdiblesService) {
    return EdiblesService.get({
      edibleId: $stateParams.edibleId
    }).$promise;
  }

  newEdible.$inject = ['EdiblesService'];

  function newEdible(EdiblesService) {
    return new EdiblesService();
  }
})();
