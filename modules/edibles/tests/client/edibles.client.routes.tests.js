(function () {
  'use strict';

  describe('Edibles Route Tests', function () {
    // Initialize global variables
    var $scope,
      EdiblesService;

    //We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _EdiblesService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      EdiblesService = _EdiblesService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('edibles');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/edibles');
        });

        it('Should be abstract', function () {
          expect(mainstate.abstract).toBe(true);
        });

        it('Should have template', function () {
          expect(mainstate.template).toBe('<ui-view/>');
        });
      });

      describe('View Route', function () {
        var viewstate,
          EdiblesController,
          mockEdible;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('edibles.view');
          $templateCache.put('modules/edibles/client/views/view-edible.client.view.html', '');

          // create mock Edible
          mockEdible = new EdiblesService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Edible Name'
          });

          //Initialize Controller
          EdiblesController = $controller('EdiblesController as vm', {
            $scope: $scope,
            edibleResolve: mockEdible
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:edibleId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.edibleResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            edibleId: 1
          })).toEqual('/edibles/1');
        }));

        it('should attach an Edible to the controller scope', function () {
          expect($scope.vm.edible._id).toBe(mockEdible._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/edibles/client/views/view-edible.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          EdiblesController,
          mockEdible;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('edibles.create');
          $templateCache.put('modules/edibles/client/views/form-edible.client.view.html', '');

          // create mock Edible
          mockEdible = new EdiblesService();

          //Initialize Controller
          EdiblesController = $controller('EdiblesController as vm', {
            $scope: $scope,
            edibleResolve: mockEdible
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.edibleResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/edibles/create');
        }));

        it('should attach an Edible to the controller scope', function () {
          expect($scope.vm.edible._id).toBe(mockEdible._id);
          expect($scope.vm.edible._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/edibles/client/views/form-edible.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          EdiblesController,
          mockEdible;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('edibles.edit');
          $templateCache.put('modules/edibles/client/views/form-edible.client.view.html', '');

          // create mock Edible
          mockEdible = new EdiblesService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Edible Name'
          });

          //Initialize Controller
          EdiblesController = $controller('EdiblesController as vm', {
            $scope: $scope,
            edibleResolve: mockEdible
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:edibleId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.edibleResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            edibleId: 1
          })).toEqual('/edibles/1/edit');
        }));

        it('should attach an Edible to the controller scope', function () {
          expect($scope.vm.edible._id).toBe(mockEdible._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/edibles/client/views/form-edible.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
})();
