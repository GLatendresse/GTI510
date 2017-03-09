(function () {
  'use strict';

  angular
    .module('groups')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    menuService.addMenuItem('topbar', {
      title: 'Groupes',
      state: 'groups',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'groups', {
      title: 'Créer un groupe',
      state: 'groups.create',
      roles: ['*']
    });
    menuService.addSubMenuItem('topbar', 'groups', {
      title: 'Voir mes groupes',
      state: 'groups.list',
      roles: ['*']
    });
  }
}());
