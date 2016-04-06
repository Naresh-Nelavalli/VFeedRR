(function () {
  'use strict';

  angular
    .module('edibles')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(Menus) {
    // Set top bar menu items
    Menus.addMenuItem('topbar', {
      title: 'Edibles',
      state: 'edibles',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    Menus.addSubMenuItem('topbar', 'edibles', {
      title: 'List Edibles',
      state: 'edibles.list'
    });

    // Add the dropdown create item
    Menus.addSubMenuItem('topbar', 'edibles', {
      title: 'Create Edible',
      state: 'edibles.create',
      roles: ['user']
    });
  }
})();
