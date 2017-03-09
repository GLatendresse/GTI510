(function () {
  'use strict';

  angular
    .module('groups.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('groups.create', {
        url: 'creategroup',
        templateUrl: '/modules/groups/client/views/create-group.client.view.html',
        controller: 'CreateGroupController',
        controllerAs: 'vm'
      });
  }
}());
